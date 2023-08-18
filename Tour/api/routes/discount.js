import express from "express";
import { checkDiscount, createDiscount, deleteDiscount, getAllDiscount } from "../controllers/discount.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", getAllDiscount);
router.get("/check-discount/:code", checkDiscount);
router.post("/", verifyAdmin, createDiscount);
// router.get("/:id", getService);
router.delete("/:id", verifyAdmin, deleteDiscount);


export default router;
