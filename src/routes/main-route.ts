import { Request, Response, Router } from "express";


export const routes = Router();

routes.get('/ping', function(req:Request, res:Response) {
    res.json({
        pong: true
    });
});
