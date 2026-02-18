import { Request, Response, NextFunction } from "express";
import * as postService from "../services/post.service";

export const _createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Post = await postService.createPost({
            userId: req.body.userId,
            imageURL: req.body.imageURL,
            caption: req.body.caption
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: Post,
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
