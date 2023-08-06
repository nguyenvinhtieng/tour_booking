import express from "express";
import {
    addBooking,
    getAllBookings,
    acceptTour,
    cancelTour
} from "../controllers/booking.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyUser, addBooking);
router.get("/", getAllBookings);
router.post("/accept", acceptTour);
router.post("/cancel", cancelTour);

export default router;
