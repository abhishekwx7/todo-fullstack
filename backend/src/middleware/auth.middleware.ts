import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
    id: string;
}

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing!"
            })
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format!"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET!,
        ) as JWTPayload;

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token!"
        })
    }
}