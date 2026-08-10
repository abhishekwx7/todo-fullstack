import { Request, Response } from "express";
import { signupSchema, signinSchema } from "../validations/auth.validation";
import * as authService from "../services/auth.service";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export async function signup(req: Request, res: Response) {
    try {
        const body = signupSchema.parse(req.body);

        const data = await authService.signup(
            body.name,
            body.email,
            body.password
        );

        res.status(201).json(data);

    } catch (err: any) {
        res.status(400).json({
            message: err.message
        });
    }
}

export async function signin(req: Request, res: Response) {
    try {
        const body = signinSchema.parse(req.body);

        const data = await authService.signin(
            body.email,
            body.password
        );

        res.json(data);

    } catch (err: any) {
        res.status(400).json({
            message: err.message
        });
    }
}

export async function getMe(
    req: AuthRequest,
    res: Response
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        return res.json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
}