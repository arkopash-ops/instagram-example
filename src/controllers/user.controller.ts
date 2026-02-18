import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const _createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user,
        })
    } catch (error) {
        next(error);
    }
}


export const _fetchAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.fetchAllUser();

        return res.status(200).json({
            success: true,
            message: "User retrived Successfully",
            length: user.length,
            user,
        })
    } catch (error) {
        next(error);
    }
}
