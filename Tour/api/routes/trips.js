import express from "express";
import {
  createTrip,
  deleteTrip,
  getTrip,
  getTrips,
  updateTrip,
  updateTripAvailability,
} from "../controllers/trip.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:tourid", verifyAdmin, createTrip);

//UPDATE
router.put("/availability/:id", updateTripAvailability);
router.put("/:id", verifyAdmin, updateTrip);
//DELETE
router.delete("/:id/:tourid", verifyAdmin, deleteTrip);
//GET

router.get("/:id", getTrip);
//GET ALL

router.get("/", getTrips);

export default router;
