import PostModel, { PostDocument } from "../models/post.model";
import CommentModel from "../models/comments.model";
import { Post } from "../types/post.types";

interface IPost extends Post { }

export const createPost = async (data: IPost): Promise<PostDocument> => {
    try {
        const newPost = await PostModel.create({
            userId: data.userId,
            imageURL: data.imageURL,
            caption: data.caption
        });
        return newPost;
    } catch (err) {
        throw {
            statusCode: 500,
            message: "Failed to create post",
            error: err
        };
    }
}


export const fetchAllPosts = async (): Promise<PostDocument[]> => {
    const posts = await PostModel.find();

    if (posts.length === 0) {
        throw {
            statusCode: 404,
            message: "No Post found.",
        }
    }

    return posts;
}


export const fetchPostByUser = async (userId: string): Promise<PostDocument[]> => {
    const posts = await PostModel.find({ userId });

    if (posts.length === 0) {
        throw {
            statusCode: 404,
            message: "No Post found.",
        }
    }

    return posts;
}


export const editPost = async (
    postId: string,
    data: Pick<IPost, "caption">
): Promise<PostDocument> => {
    const postExists = await PostModel.findById(postId);

    if (!postExists) {
        throw {
            statusCode: 404,
            message: "Post not found.",
        };
    }

    const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $set: data },
        { returnDocument: "after" }
    );

    if (!updatedPost) {
        throw {
            statusCode: 500,
            message: "Failed to update the Post.",
        };
    }

    return updatedPost;
}


export const deletePost = async (postId: string): Promise<PostDocument> => {
    const postExists = await PostModel.findById(postId);

    if (!postExists) {
        throw {
            statusCode: 404,
            message: "Post not found.",
        };
    }

    await CommentModel.deleteMany({ postId });

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
        throw {
            statusCode: 500,
            message: "Failed to delete the Post.",
        };
    }

    return deletedPost;
};
