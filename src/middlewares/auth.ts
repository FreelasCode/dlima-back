import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as ResponseHelper from '../helpers/ResponseHelper';

const secret: string = process.env["SECRET"] || "DEFAULT_SECRET";


const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("teste")
        const token = req.headers.authorization!.split(" ")[1]
        const decode = jwt.verify(token, secret)
        req.body.user = decode
        next()
    } catch (error) { 
        return res.status(401).json({message: "Error"})
    }
}

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1]
        const decode = jwt.verify(token, secret)
        req.body.user = decode
        next()
    } catch (error) { 
        return res.status(401).json({message: "Error"})
    }
}

export default authorize;