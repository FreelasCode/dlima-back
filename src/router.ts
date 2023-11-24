import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import * as ItemController from './controllers/ItemController';
import * as UserController from './controllers/UserController';
import { upload } from "./services/StorageService";
import authorize from "./middlewares/auth";

const prisma = new PrismaClient()

const router: Router = Router()

router.post("/admin/user/create", async (req, res) => {
    console.log("teste")
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
        console.log(error)
        res.send("Error creating user")
    }

})

router.post("/user/login", UserController.login)

// Item routes 
router.post("/admin/item/create", upload.single('image'), ItemController.createItem)

router.get("/item/list/:order", ItemController.listItems)

router.get("/item/list/name/:name", ItemController.listItemsByName)

router.get("/images/:image", ItemController.getImage)

router.get("/item/:id", ItemController.getItem)

router.post("/admin/item/edit", upload.single('image'), ItemController.editItem)

router.post("/admin/item/delete", ItemController.deleteItem)

export { router };

