import express from "express";
import { getUser, updateUser, listFollowers, listFollowing, removeFollowers, removeFollowing} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
console.log("mid........");
// router.use(verifyToken);
router.get("/", verifyToken, getUser);
router.post("/edit", verifyToken, updateUser);
router.get("/followers", verifyToken, listFollowers);
router.get("/following", verifyToken, listFollowing);
router.get("/remove/:followerId/followers", verifyToken, removeFollowers);
router.get("/remove/:followingId/following", verifyToken, removeFollowing);

// router.get("/:id", verifyToken, getUser);

export default router;