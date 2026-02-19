import PostModel, { PostDocument } from "../models/post.model";
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
