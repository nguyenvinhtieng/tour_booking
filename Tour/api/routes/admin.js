import express from "express";
import { getDataDashBoard } from "../controllers/admin.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.get("/data-dashboard", getDataDashBoard);


export default router;
