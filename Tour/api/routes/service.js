import express from "express";
import { getAllService, getService, createService, deleteService } from "../controllers/service.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", getAllService);
router.post("/", verifyAdmin, createService);
router.get("/:id", getService);
router.delete("/:id", verifyAdmin, deleteService);


export default router;
