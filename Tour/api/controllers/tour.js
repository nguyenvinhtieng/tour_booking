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
    return res.status(200).json(tour);
  } catch (err) {
    next(err);
  }
};
export const getTours = async (req, res, next) => {
  const { min, max, city, type, ...others } = req.query;
  try {
    let objSearch = {};
    if(city) objSearch.city = city;
    if(type) objSearch.type = type;
    objSearch = Object.assign(objSearch, others);
    console.log(objSearch);
    const tours = await Tour.find({
      ...objSearch,
      cheapestPrice: { $gt: min || 0, $lt: max || Infinity },
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
    const naturalCount = await Tour.countDocuments({ type: "Thiên nhiên" });
    const cityCount = await Tour.countDocuments({ type: "Thành phố" });
    const cultureCount = await Tour.countDocuments({ type: "Văn hóa" });
    const foodCount = await Tour.countDocuments({ type: "Ẩm thực" });
    const expCount = await Tour.countDocuments({ type: "Trải nghiệm" });

    res.status(200).json([
      { type: "Thiên nhiên", count: naturalCount },
      { type: "Thành phố", count: cityCount },
      { type: "Văn hóa", count: cultureCount },
      { type: "Ẩm thực", count: foodCount },
      { type: "Trải nghiệm", count: expCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getTourTrips = async (req, res, next) => {
  try {
    // console.log()
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