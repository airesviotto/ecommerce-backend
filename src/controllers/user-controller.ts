import { RequestHandler } from "express";
import { loginSchema } from "../schemas/auth-schema";
import { HttpResponse } from "../utils/http-response";
import { authUser } from "../services/user-service";


export const login : RequestHandler = async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if(!result) {
        res.status(400).json(HttpResponse.badRequest('E-mail and/or password Invalid'));
    }

    const {email, password} = result.data;

    const token = await authUser(email, password);
    if(!token) {
        res.status(401).json(HttpResponse.unauthorized('This access is unauthorized'));
        return;
    }

    res.status(200).json(HttpResponse.success({token}));
}