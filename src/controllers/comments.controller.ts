import { Request, Response, NextFunction } from "express";
import * as commentService from "../services/comments.service";

export const _createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const comment = await commentService.createComment({
            postId: req.body.postId,
            userId: req.body.userId,
            text: req.body.text
        });

        return res.status(201).json({
            success: true,
            message: "Comment Created.",
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};


export const _fetchAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const comments = await commentService.fetchAllComments();

        return res.status(200).json({
            success: true,
            message: "Comments retrived successfully.",
            length: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};


export const _fetchCommentsByPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { postId } = req.params;

        if (!postId || typeof postId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing postId parameter."
            });
        }

        const comments = await commentService.fetchCommentsByPost(postId);

        return res.status(200).json({
            success: true,
            message: "Post Comments retrived successfully.",
            length: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
}


export const _editComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { commentId } = req.params;

        if (!commentId || typeof commentId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid commentId parameter.",
            });
        }

        const comment = await commentService.editComment(commentId, {
            text: req.body.text,
        });

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully.",
            data: comment,
        });
    } catch (error) {
        next(error)
    }
}
