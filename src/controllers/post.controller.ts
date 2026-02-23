import { Request, Response, NextFunction } from "express";
import * as postService from "../services/post.service";

export const _createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { imageURL, caption } = req.body;

        if (!imageURL || !caption) {
            return res.status(400).json({
                success: false,
                message: "imageURL and caption are required",
            });
        }

        const post = await postService.createPost({
            userId: req.user._id,
            imageURL,
            caption,
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: post,
        });

    } catch (error) {
        next(error);
    }
};


export const _fetchAllPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await postService.fetchAllPosts();

        return res.status(200).json({
            success: true,
            message: "post retrived successfully.",
            length: post.length,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};


export const _fetchPostByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing userId parameter."
            });
        }

        const posts = await postService.fetchPostByUser(userId);

        return res.status(200).json({
            success: true,
            message: "User posts retrieved successfully.",
            length: posts.length,
            data: posts,
        });
    } catch (error) {
        next(error);
    }
}


export const _editPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { postId } = req.params;
        const userId = req.user!._id.toString();

        if (!postId || typeof postId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid postId parameter.",
            });
        }

        const post = await postService.editPost(
            postId,
            userId,
            { caption: req.body.caption }
        );

        return res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            data: post,
        });
    } catch (error) {
        next(error)
    }
}


export const _deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { postId } = req.params;
        const userId = req.user!._id.toString();

        if (!postId || typeof postId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid postId parameter.",
            });
        }

        const deletedPost = await postService.deletePost(postId, userId);

        return res.status(200).json({
            success: true,
            message: "Post and related comments deleted successfully.",
            data: deletedPost,
        });
    } catch (error) {
        next(error);
    }
};
