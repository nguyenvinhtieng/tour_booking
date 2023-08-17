import Tour from "../models/Tour.js";
import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getAllBookingAvailble = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ status: "success" }).populate("tour_id").populate("trip_id").populate("user_id");
        return res.status(200).json(bookings);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const bookingTour = async (req, res, next) => {
    try {
        // req.user
        let userId = req.user.id;
        let { id } = req.body;
        let booking = await Booking.findById(id);
        if(!booking) return res.status(400).json({status: false, message: "booking not found"});
        if(booking.tour_guide == userId) return res.status(400).json({status: false, message: "you are tour guide of this booking"});
        booking.tour_guide = userId;
        await booking.save();
        return res.status(200).json({status: true, message: "booking success"});
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAllTourGuide = async (req, res, next) => {
    try {
        let tourGuides = await User.find({ role: "staff" });
        return res.status(200).json(tourGuides);
    } catch (err) {
        next(err);
    }
}

export const bookingTourGuide = async (req, res, next) => {
    try {
        console.log(req.body)
        const {id, userId} = req.body;
        let userFind = await User.findById(userId);
        if(!userFind) return res.status(400).json({status: false, message: "user not found"});
        let booking = await Booking.findById(id);
        if(!booking) return res.status(400).json({status: false, message: "booking not found"});
        booking.tour_guide = userId;
        await booking.save();
        return res.status(200).json({status: true, message: "booking success"});
    } catch (err) {
        console.log(err);
        next(err);
    }
}