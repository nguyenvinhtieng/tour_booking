import Trip from "../models/Trip.js";
import Tour from "../models/Tour.js";
import { createError } from "../utils/error.js";

export const createTrip = async (req, res, next) => {
  const tourId = req.params.tourid;
  const newTrip = new Trip(req.body);

  try {
    const savedTrip = await newTrip.save();
    try {
      await Tour.findByIdAndUpdate(tourId, {
        $push: { trips: savedTrip._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedTrip);
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTrip);
  } catch (err) {
    next(err);
  }
};
export const updateTripAvailability = async (req, res, next) => {
  try {
    await Trip.updateOne(
      { "tripNumbers._id": req.params.id },
      {
        $push: {
          "tripNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Chuyến đi này đã được cập nhật!");
  } catch (err) {
    next(err);
  }
};
export const deleteTrip = async (req, res, next) => {
  const tourId = req.params.tourid;
  try {
    await Trip.findByIdAndDelete(req.params.id);
    try {
      await Tour.findByIdAndUpdate(tourId, {
        $pull: { trips: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Chuyến đi này đã bị xóa!");
  } catch (err) {
    next(err);
  }
};
export const getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};
export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};