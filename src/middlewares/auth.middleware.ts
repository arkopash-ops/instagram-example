import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            throw {
                success: false,
                message: "Authorization header missing",
            }
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            throw {
                success: false,
                message: "Token missing",
            }
        }

        const decoded = verifyToken(token);
        req.user = decoded;

        next();
    } catch (error) {
         next(error);
    }
}
