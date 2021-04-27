import express from "express";
import Resource from "../model/resourceModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";

const resourceRouter = express.Router();



resourceRouter.get(
    "/getResource",
    //isAuth,
    expressAsyncHandler(async(req, res) => {
        const resources = await Resource.find({});
        res.status(200).send(resources);
    })
);


resourceRouter.get(
    "/:id",
    expressAsyncHandler(async(req, res) => {
        const resources = await Resource.findById(req.params.id);
        if (resources) {
            res.send(resources);
        } else {
            res.status(404).send({ message: "Resource Not Found" });
        }
    })
);



resourceRouter.put(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const resources = await Resource.findById(req.params.id);
        if (resources) {
            resources.verified = req.body.verified || resources.verified;
            resources.city = req.body.city || resources.city;
            resources.state = req.body.state || resources.state;
            resources.contactInfo = req.body.contactInfo || resources.contactInfo;
            resources.description = req.body.description || resources.description;
            resources.title = req.body.title || resources.title;

            const updatedResource = await resources.save();
            res.status(204).send({ message: "Resource Updated", resource: updatedResource });
        } else {
            res.status(404).send({ message: "Resource Not Found" });
        }
    })
);


resourceRouter.delete(
    "/:id",
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const resource = await Resource.findById(req.params.id);
        if (resource) {

            const deleteResource = await resource.remove();
            res.status(200).send({ message: "Resource Deleted", resource: deleteResource });
        } else {
            res.status(404).send({ message: "Resource Not Found" });
        }
    })
);




resourceRouter.post(
    "/create",
    isAuth,

    expressAsyncHandler(async(req, res) => {
        const resource = new Resource({
            title: req.body.title,
            description: req.body.description,
            contactInfo: req.body.contactInfo,
            city: req.body.city,
            state: req.body.state,
            verified: req.body.verified
        });
        const createdResource = await resource.save();
        res.send({ message: "Resource Created", resource: createdResource });
    })
);

export default resourceRouter;