import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })  
        console.log(user)
        // if(!user) { 
        //     return res.send("email not founded")
        // }

        // if(user.password !== password) {
        //     return res.send("password incorrect")
        // }


    } catch (error) {
        console.log(error)
        res.send("Error login")
    }
};