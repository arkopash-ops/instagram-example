import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";
import UserModel from "../models/user.model";

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            throw {
                success: false,
                message: "Authorization header missing",
            }
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw {
                success: false,
                message: "Token missing",
            }
        }

        const decoded = verifyToken(token) as { id: string };

        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            throw {
                success: false,
                message: "User not found",
            }
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};
