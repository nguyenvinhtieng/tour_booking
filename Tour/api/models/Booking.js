import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    status: { type: String, enum: ["confirming", 'success', 'canceled'], required: true, default : "confirming" },
    price: { type: Number, required: true },
},
{
    timestamps: true,
});

export default mongoose.model("Booking", BookingSchema)