import { Request, Response } from "express";
import { signupSchema, signinSchema } from "../validations/auth.validation";
import * as authService from "../services/auth.service";

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