import express from "express";
import {listAllJoinedSubgreddits, listAllSubgreddits, sendJoinRequest } from "../controllers/AllSubgreddits.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/list/join", verifyToken, listAllJoinedSubgreddits);
router.get("/list", verifyToken, listAllSubgreddits);
router.post("/:subgreddiitId/joinrequest", verifyToken, sendJoinRequest);

export default router;