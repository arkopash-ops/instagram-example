import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const _register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token } = await userService.register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: { user, token },
        })
    } catch (error) {
        next(error);
    }
}


export const _fetchAllRegisteredUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.fetchAllRegisteredUser();

        return res.status(200).json({
            success: true,
            message: "User retrived Successfully",
            length: users.length,
            users,
        })
    } catch (error) {
        next(error);
    }
}
