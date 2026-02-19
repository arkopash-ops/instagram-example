import CommentModel, { CommentsDocument } from "../models/comments.model";
import { Comment } from "../types/comments.types";

interface IComment extends Comment { }

export const createComment = async (data: IComment): Promise<CommentsDocument> => {
    try {
        const newComment = await CommentModel.create({
            postId: data.postId,
            userId: data.userId,
            text: data.text
        });
        return newComment;
    } catch (err) {
        throw {
            statusCode: 500,
            message: "Failed to Comment!",
            error: err
        };
    }
}


export const fetchAllComments = async (): Promise<CommentsDocument[]> => {
    const comments = await CommentModel.find();

    if (comments.length === 0) {
        throw {
            statusCode: 404,
            message: "There are no comments yet.",
        }
    }

    return comments;
}

export const fetchCommentsByPost = async (postId: string): Promise<CommentsDocument[]> => {
    const comments = await CommentModel.find({ postId });

    if (comments.length === 0) {
        throw {
            statusCode: 404,
            message: "There are no comments yet.",
        }
    }

    return comments;
}
