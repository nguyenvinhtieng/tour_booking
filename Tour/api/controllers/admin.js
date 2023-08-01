import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Trip from "../models/Trip.js";
// import Room from "../models/Room.js";

export const getDataDashBoard = async (req, res, next) => {
  try {
    let numberOfUsers = await User.countDocuments();
    let trips = await Trip.find();
    // let numberOfTours = await Tour.countDocuments();
    const tours = await Tour.find({cheapestPrice: { $gt:  1, $lt: 999 }});

    return res.json({ numberOfUsers, trips, tours });
    // const savedHotel = await newHotel.save();
    // res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
