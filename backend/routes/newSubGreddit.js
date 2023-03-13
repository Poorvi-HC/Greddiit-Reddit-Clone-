import express from "express";
import { mysubgreddit, listMySubgreddits, getSubgreddit, listRequests, rejectRequest, acceptRequest, UsersDisplay } from "../controllers/MySubGreddit.js";
import { verifyToken } from "../middleware/auth.js";
import { getPost, upvotePost, downvotePost, savePost, addComment, removeSavedPost, followUser} from "../controllers/post.js";

const router = express.Router();

router.post("/", mysubgreddit);
router.get("/list",verifyToken, listMySubgreddits);
router.get("/:subgreddiitId", verifyToken, getSubgreddit);
router.get("/:subgreddiitId/Post/list", verifyToken, getPost);
router.post("/:subgreddiitId/Post/:postId/upvote", verifyToken, upvotePost);
router.post("/:subgreddiitId/Post/:postId/downvote", verifyToken, downvotePost);
router.post("/:subgreddiitId/Post/:postId/save", verifyToken, savePost);
router.post("/:subgreddiitId/Post/:postId/comment", verifyToken, addComment);
router.get("/:subgreddiitId/request/list", verifyToken, listRequests);
router.post("/:subgreddiitId/request/:rejectId/reject", verifyToken, rejectRequest);
router.post("/:subgreddiitId/request/:acceptId/accept", verifyToken, acceptRequest);
router.get("/:subgreddiitId/users", verifyToken, UsersDisplay);
router.post("/:subgreddiitId/Post/:postId/saved/remove", verifyToken, removeSavedPost);
router.post("/:subgreddiitId/Post/:postId/follow", verifyToken, followUser);

export default router;