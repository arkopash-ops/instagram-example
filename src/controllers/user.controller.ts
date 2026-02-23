import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const _registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token } = await userService.registerUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        return res.status(201).json({
            success: true,
            message: "User Registerd Successfully.",
            data: { user, token },
        })
    } catch (error) {
        next(error);
    }
}


export const _loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token } = await userService.loginUser({
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).json({
            success: true,
            message: "Login Successfully.",
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
