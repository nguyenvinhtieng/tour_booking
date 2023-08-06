import mongoose from "mongoose";
const RechargeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    money: { type: Number, required: true },
}, {
    timestamps: true
});

export default mongoose.model("Recharge", RechargeSchema)