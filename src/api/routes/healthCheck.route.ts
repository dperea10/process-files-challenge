import { NextFunction } from './../../../node_modules/@types/express-serve-static-core/index.d';
import { Router, Request, Response } from "express";
 
const healthRoute = Router();

healthRoute.get('/health', (req: Request, res: Response) => {
    res.send('ok')
})

export {healthRoute};