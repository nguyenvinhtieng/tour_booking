import mongoose from "mongoose";
const DiscountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    total: { type: Number, required: true },
    used: { type: Number, required: true },
},
{
    timestamps: true,
});

export default mongoose.model("Discount", DiscountSchema)