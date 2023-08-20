import express from "express";
import {
  countByCity,
  countByType,
  createTour,
  deleteTour,
  getTour,
  getTourTrips,
  getTours,
  updateTour,
} from "../controllers/tour.js";
import Tour from "../models/Tour.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createTour);

//UPDATE
router.put("/:id", verifyAdmin, updateTour);
//DELETE
router.delete("/:id", verifyAdmin, deleteTour);
//GET

router.get("/find/:id", getTour);
//GET ALL

router.get("/", getTours);
router.get("/:id", getTour)
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/trip/:id", getTourTrips);

export default router;