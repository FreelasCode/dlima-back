import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import * as ItemController from './controllers/ItemController';
import { upload } from "./services/StorageService";

const prisma = new PrismaClient()

const router: Router = Router()

router.post("/admin/user/create", async (req, res) => {

    const { email, name, username, password } = req.body;
    try {
        await prisma.user.create({
            data: {
                email,
                name,
                username,
                password
            }
        })
        res.send("User created successfully")
    } catch (error) {
        res.send("Error creating user")
    }

})


// Item routes 
router.post("/admin/item/create", upload.single('image'), ItemController.createItem)

router.get("/item/list", ItemController.listItems)



router.post("/admin/item/edit", upload.single('image'), ItemController.editItem)

router.post("/admin/item/delete", async (req, res) => {
    const { item_id, user_id  } = req.body;

    try {

        res.send("User created successfully")
    } catch (error) {
        res.send("Error creating user")
    }

})


export { router };

