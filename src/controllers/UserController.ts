import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import * as ResponseHelper from '../helpers/ResponseHelper';
const prisma = new PrismaClient()

const secret: string = process.env["SECRET"] || "DEFAULT_SECRET";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })  

        if(!user) { 
            return ResponseHelper.sendExceptionToClient(new Error("Email not founded"), res)
        }

        if(user.password !== password) {
            return ResponseHelper.sendExceptionToClient(new Error("Password incorrect"), res)
        }

        const token = await jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, secret)

        return ResponseHelper.handleApiResponse(res, {success: true, data: {token}})

    } catch (error) {
        return ResponseHelper.sendExceptionToClient(new Error("Error when trying to login"), res)
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        
        // return ResponseHelper.handleApiResponse(res, {success: true, data: {token}})

    } catch (error) {
        return ResponseHelper.sendExceptionToClient(new Error("Error when trying to login"), res)
    }
};