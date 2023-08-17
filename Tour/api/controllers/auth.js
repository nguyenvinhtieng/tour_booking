import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      role: req.body.isStaff == "staff" ? "staff" : "user",
      password: hash,
    });
    await newUser.save();
    res.status(200).send("Tạo người dùng thành công!");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    // get user header
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Không tìm thấy người dùng!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Tài khoản hoặc mật khẩu sai!"));

    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT
    );
    const { password, role, ...otherDetails } = user._doc;
    return res.status(200).json({ details: { ...otherDetails, role }, role, token });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).send("Đăng xuất thành công!");
  } catch (err) {
    next(err);
  }
}