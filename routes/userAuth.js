import express from "express";
import User from "../model/users.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import data from "../data.js"

/**
 * Store auth info
 */

const userRouter = express.Router();

//USER API

userRouter.get(
    "/seed",
    expressAsyncHandler(async(req, res) => {


        const createdUsers = await User.insertMany(data.users);
        res.status(200).send({ createdUsers });
    })
);


userRouter.post(
    "/signup",
    expressAsyncHandler(async(req, res) => {
        const userAuthData = new User({
            phone: req.body.phone,
            pass: bcrypt.hashSync(req.body.pass, 8),
            isAdmin: req.body.isAdmin
        });

        const user = await User.findOne({ phone: req.body.phone });

        if (user) {
            res.status(409).send({ message: "User already exists!" });
        } else {
            const createdUser = await userAuthData.save();

            res.status(200).send({
                phone: createdUser.phone,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            })
        }
    })
);


userRouter.post("/signin", expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({ phone: req.body.phone });
    if (user) {
        if (bcrypt.compareSync(req.body.pass, user.pass)) {
            res.send({
                _id: user._id,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send(new Error({ message: "Invalid Phone number or Password" }));
}))


userRouter.delete(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.phone === "+919990614406") {
                res.status(400).send({ message: "Can Not Delete Admin User" });
                return;
            }
            const deleteUser = await user.remove();
            res.send({ message: "User Deleted", user: deleteUser });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);


userRouter.put(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.phone = req.body.phone || user.phone;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            const updatedUser = await user.save();
            res.status(204).send({ message: "User Updated", user: updatedUser });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);



userRouter.get(
    "/",
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const users = await User.find({});
        res.status(200).send(users);
    })
);





userRouter.get(
    "/:id",
    expressAsyncHandler(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);



export default userRouter;