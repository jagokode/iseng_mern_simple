import express from "express";
import {
  addPost,
  allPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

router.route("/").get(allPosts).post(addPost);
router.route("/:postId").patch(updatePost).delete(deletePost);

export default router;
