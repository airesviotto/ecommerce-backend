import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from '../routes/main-route';

const server = express();
server.use(cors());
server.use(express.static('public'));
server.use('webhook/stripe', express.raw({type: 'application/json'}));

server.use(express.json());
server.use(routes);

server.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(500).json({
        error: 'An API error has occured'
    });
});

const port = process.env.PORT || 4000;
server.listen(port, function() {
    console.log(`SERVER IS RUNNING ON PORT= ${port}`);
});