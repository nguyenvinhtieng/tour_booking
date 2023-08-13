import express from "express";
import { getAllBookingAvailble, bookingTour, getAllTourGuide, bookingTourGuide} from "../controllers/tourguide.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getAllBookingAvailble);
router.post("/booking", verifyToken, bookingTourGuide);
router.get("/get-all-tourguide", verifyToken, getAllTourGuide);
router.post("/", verifyToken,  bookingTour)

export default router;