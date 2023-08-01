import Tour from "../models/Tour.js";
import Trip from "../models/Trip.js";

export const createTour = async (req, res, next) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json(savedTour);
  } catch (err) {
    next(err);
  }
};
export const updateTour = async (req, res, next) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTour);
  } catch (err) {
    next(err);
  }
};
export const deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json("Tour này đã được xóa.");
  } catch (err) {
    next(err);
  }
};
export const getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json(tour);
  } catch (err) {
    next(err);
  }
};
export const getTours = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const tours = await Tour.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(tours);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Tour.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const moutainCount = await Tour.countDocuments({ type: "Moutain" });
    const beachCount = await Tour.countDocuments({ type: "Beach" });
    const cultureCount = await Tour.countDocuments({ type: "Culture" });
    const foodCount = await Tour.countDocuments({ type: "Food" });
    const cityCount = await Tour.countDocuments({ type: "City" });

    res.status(200).json([
      { type: "Moutain", count: moutainCount },
      { type: "Beach", count: beachCount },
      { type: "Culture", count: cultureCount },
      { type: "Food", count: foodCount },
      { type: "City", count: cityCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getTourTrips = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    const list = await Promise.all(
      tour.trips.map((trip) => {
        return Trip.findById(trip);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};