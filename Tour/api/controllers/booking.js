import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";
// import Service from "../models/Service.js";
// import Room from "../models/Room.js";
import service from "../models/service.js";
import Discount from "../models/Discount.js";


export const addBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { tour_id, trip_id, services, discount: d, start_date, end_date } = req.body;
    const user = await User.findById(userId);
    const tour = await Tour.findById(tour_id);
    const trip = await Trip.findById(trip_id);
    let totalPrice = tour.cheapestPrice + tour.cheapestPrice * trip.price / 100;
    let discountObj = null;
    
    if(start_date && end_date) {
      let diff_date = 1;
      if(new Date(start_date).getDate() == new Date(end_date).getDate() && new Date(start_date).getMonth() == new Date(end_date).getMonth() && new Date(start_date).getFullYear() == new Date(end_date).getFullYear()) {
        diff_date = 1;
      } else {
        diff_date = Math.ceil(Math.abs(new Date(start_date) - new Date(end_date)) / (1000 * 60 * 60 * 24));
      }
      totalPrice = totalPrice * diff_date;
    }
    if(d) {
      let discount = await Discount.findOne({ code: d });
      let reduce = discount.value;
      totalPrice = totalPrice - totalPrice * reduce / 100;
      discount.used = discount.used + 1;
      discountObj = { ...discount._doc}
      await discount.save();
    }
    const selectedServices = []
    if(services.length > 0) {
      for(let i = 0; i < services.length; i++) {
        const s = await service.findById(services[i]);
        selectedServices.push(s);
        totalPrice += s.price;
      }
    }
    
    const booking = await Booking.create({
      tour_id,
      user_id: userId,
      trip_id,
      price: totalPrice,
      services: selectedServices,
      discount: discountObj
    });
    res.status(200).json({ user, tour, trip, booking, services: selectedServices });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    let bookings = await Booking.find().populate("user_id").populate("tour_id").populate("trip_id").populate("tour_guide");
    bookings = [...bookings].map((booking) => {
      return {
        ...booking._doc,
        user_username: booking.user_id.username,
        tour_name: booking.tour_id.name,
        trip_title: booking.trip_id.title,
      }
    })
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
}

export const acceptTour = async (req, res, next) => {
  try {
    const { id } = req.body;
    const booking = await Booking.findById(id);
    const user = await User.findById(booking.user_id);
    const balance = user.balance;
    if(balance < booking.price) {
      booking.status = "canceled";
      await booking.save();
      return res.status(200).json({status: false, message: "user không đủ số dư, booking đã bị hủy"})
    }
    booking.status = "success";
    user.balance = balance - booking.price;
    await user.save();
    await booking.save();
    let adminUser = await User.findOne({isAdmin: true});
    adminUser.balance = adminUser.balance + booking.price;
    await adminUser.save();
    return res.status(200).json({status: true, message: "Đặt tour thành công"})
  } catch (err) {
    next(err);
  }
}

export const cancelTour = async (req, res, next) => {
  try {
    const { id } = req.body;
    const booking = await Booking.findById(id);
    booking.status = "canceled";
    await booking.save();
    return res.status(200).json({status: true, message: "Hủy tour thành công"})
  } catch (err) {
    next(err);
  }
}



