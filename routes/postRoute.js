import express from "express";
import * as postController from "../controllers/postController.js";


const router = express.Router();

router.route("/createPost").post(postController.createPost);



export default router;