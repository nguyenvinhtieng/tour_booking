import Booking from "../models/Booking.js";
import Recharge from "../models/Recharge.js";
import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const getUserInfo = async (req,res,next)=>{
  try {
    let userId = req.user.id;
    let userGet = await User.findById(userId);
    res.status(200).json(userGet);
  } catch (err) {
    next(err);
  }
}
export const getDataWallet = async (req,res,next)=> { 
  try {
    let userId = req.user.id;
    let userGet = await User.findById(userId);
    let dataWallet = await Recharge.find({ user: userId });
    let bookings = await Booking.find({ user_id: userId });
    res.status(200).json({ userGet, dataWallet, bookings });
  } catch (err) {
    next(err);
  }
}
export const cancelTour = async (req,res,next)=> {
  try {
    const {id} = req.body;
    await Booking.findByIdAndUpdate(id, { $set: { status: "canceled" } });
    res.status(200).json("Đã hủy tour thành công!");
  } catch (err) {
    next(err);
  }
}
export const addMoney = async (req,res,next)=>{
  try {
    let userId = req.user.id;
    let currentUser = await User.findById(userId);
    const { money } = req.body;
    let totalMoney = currentUser.balance + Number(money);
    let newUser = await User.findByIdAndUpdate(
      userId,
      { $set: { balance: totalMoney } },
      { new: true }
    );

    let recharge = new Recharge({
      user: userId,
      money: Number(money),
    });
    await recharge.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Người dùng này đã bị xóa!");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
