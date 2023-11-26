import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as ResponseHelper from '../helpers/ResponseHelper';
import path from 'path';
const prisma = new PrismaClient()
import cloudinary from '../services/CloudinaryConfig';

export const createItem = async (req: Request, res: Response) => {
    const { name, category, color, amount, weight, dimension, price, description} = req.body;
    try {
        if(!req.file) { 
            res.send("File not found")
        } else {
            const image = await cloudinary.uploader.upload(req.file?.path)
            const item = await prisma.item.create({
                data: {
                    name,
                    image: image.url,
                    category, 
                    color, 
                    weight: parseFloat(weight),
                    dimension, 
                    description,
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
        const { order } = req.params;
        await prisma.$connect()
        switch (parseInt(order)) {
            case 99:
                const items = await prisma.item.findMany()
                res.send(items)
                break;
            case 0:
                const itemsOrderByNewer = await prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })
                res.send(itemsOrderByNewer)
                break;
            case 1:
                const itemsOrderByOlder = await prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })
                res.send(itemsOrderByOlder)
                break;
            
            case 2: 
                const itemsOrderByNameDesc = await prisma.item.findMany({
                    orderBy: {
                        name: "desc"
                    }
                })
                res.send(itemsOrderByNameDesc)
                break;
            case 3:
                const itemsOrderByNameAsc = await prisma.item.findMany({
                    orderBy: {
                        name: "asc"
                    }
                })
                res.send(itemsOrderByNameAsc)
                break;
            case 4:
                const itemsOrderByPriceHighest = await prisma.item.findMany({
                    orderBy: {
                        price: "desc"
                    }
                })
                res.send(itemsOrderByPriceHighest)
                break;
            case 5:
                const itemsOrderByPriceLowest = await prisma.item.findMany({
                    orderBy: {
                        price: "asc"
                    }
                })
                res.send(itemsOrderByPriceLowest)
                break;
            default:
                const allItems = await prisma.item.findMany()
                res.send(allItems)
                break;
        }   
    } catch (error) {
        res.send(error)
    }
};

export const listItemsByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        await prisma.$connect()
        const items = await prisma.item.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        })
        res.send(items)
    } catch (error) {
        res.send(error)
    }

}

export const editItem = async (req: Request, res: Response) => {
    try {
        const { item_id } = req.body;
        const { name, amount, price  } = req.body;

        await prisma.$connect()
        
        const item = await prisma.item.findUnique(item_id)

        if(item) {
            const updatedItem = await prisma.item.update({
                where: {
                    id: item.id
                },
                data: {
                    name,
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
        const filePath = path.join(__dirname, '..','..', 'public', 'images')

        res.sendFile(image, { root: filePath })
    } catch (error) {
        res.send(error)
    }
}

export const changeQuantity = async(req: Request, res: Response) => {
    try {
        console.log("teste")
        const { item_id, quantity } = req.body;
        console.log(item_id, quantity)
        await prisma.$connect()
        const item = await prisma.item.update({
            where: { id: item_id },
            data: { amount: quantity },
          })
        if( item ) {
            res.send(item)
        } else {
            res.send("Item not found")
        }
    } catch (error) {
        
    }
}