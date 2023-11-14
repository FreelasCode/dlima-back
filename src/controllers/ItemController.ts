import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient()

export const createItem = async (req: Request, res: Response) => {
    const { name, amount, code, price  } = req.body;
    // npx prisma generate
    try {
        if(!req.file) { 
            // TODO: fazer o tratamento de erro 
            res.send("File not found")
        } else {
            const item = await prisma.item.create({
                data: {
                    name,
                    image: `/images/${req.file.filename}`,
                    code,
                    amount: parseInt(amount),
                    price: parseFloat(price)
                }
            })
            res.send(item)
        }
    } catch (error) {
        console.log(error)
        res.send("Error creating item")
    }
};

export const getItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    // npx prisma generate
    try {
        await prisma.$connect()

        const item = await prisma.item.findUnique({
            where: {
                id
            }
        })
        res.send(item)
    } catch (error) {
        console.log(error)
        res.send("Error getting item")
    }
};


export const listItems = async (req: Request, res: Response) => {
    try {
        await prisma.$connect()
        const items = await prisma.item.findMany()
        res.send(items)
    } catch (error) {
        res.send(error)
    }
};

export const editItem = async (req: Request, res: Response) => {
    try {
        const { item_id } = req.body;
        const { name, amount, code, price  } = req.body;

        await prisma.$connect()
        
        const item = await prisma.item.findUnique(item_id)

        if(item) {
            const updatedItem = await prisma.item.update({
                where: {
                    id: item.id
                },
                data: {
                    name,
                    code,
                    amount: parseInt(amount),
                    price: parseFloat(price)
                }
            })
            res.send(updatedItem)
        } else {
            res.send("Item not found")
        }
        
    } catch (error) {
        res.send(error)
    }
}; 
  
export const deleteItem = async (req: Request, res: Response) => {
    try {
        await prisma.$connect()
        const { item_id } = req.body;
        
        const deletedUser = await prisma.user.delete({
            where: {
                id: item_id
            }
        })
        res.send("Item deleted")
    } catch (error) {
        res.send(error)
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const { image } = req.params;
        console.log(image)

        const filePath = path.join(__dirname, '..', 'public', 'images')

        res.sendFile(image, { root: filePath })
    } catch (error) {
        res.send(error)
    }
}