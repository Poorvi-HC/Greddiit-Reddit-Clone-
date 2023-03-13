import express from "express";
import { post, getPost, savedList } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", post);
router.get("/savedlist", verifyToken, savedList);

export default router;