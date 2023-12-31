import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import toursRoute from "./routes/tours.js";
import tourguideRoute from "./routes/tourguide.js";
import tripsRoute from "./routes/trips.js";
import adminRoute from "./routes/admin.js";
import bookingRoute from "./routes/booking.js";
import serviceRoute from "./routes/service.js";
import discountRoute from "./routes/discount.js";
import chatRoute from "./routes/chat.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/tours", toursRoute);
app.use("/api/tourguide", tourguideRoute);
app.use("/api/trips", tripsRoute);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/service", serviceRoute);
app.use("/api/discount", discountRoute);
app.use("/api/chat", chatRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Có một chút lỗi ở đây thì phải!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});