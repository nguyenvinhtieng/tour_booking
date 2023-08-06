import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";
// import Room from "../models/Room.js";

export const getDataDashBoard = async (req, res, next) => {
  try {
    let userId = req.user.id;
    const me = await User.findById(userId);
    let numberOfUsers = await User.countDocuments();
    let trips = await Trip.find();
    let bookings = await Booking.find().sort({createdAt: -1}).populate("user_id").populate("tour_id").populate("trip_id");
    const tours = await Tour.find({cheapestPrice: {$lt: 999 }});
    return res.json({ numberOfUsers, trips, tours, bookings, user: me});
  } catch (err) {
    next(err);
  }
};
