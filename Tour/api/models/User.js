import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true},
    fullname: { type: String},
    gender: { type: String, default: 'Male'},
    email: { type: String, required: true, unique: true},
    country: { type: String, required: true},
    img: { type: String},
    city: { type: String, required: true},
    phone: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, default: 'user'},
    balance: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);