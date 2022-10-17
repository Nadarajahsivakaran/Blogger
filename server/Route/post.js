import { Router } from "express";
import {
  createPost,
  viewPost,
  updatePost,
  deletePost,
} from "../controller/post.js";

const router = Router();

router.post("/createPost", createPost);
router.get("/viewPost", viewPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

export default router
