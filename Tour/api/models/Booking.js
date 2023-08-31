import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    status: { type: String, enum: ["confirming", 'success', 'canceled'], required: true, default : "confirming" },
    price: { type: Number, required: true },
    tour_guide: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    services: { type : Array , "default" : [] },
    discount: { type: Object },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
},
{
    timestamps: true,
});

export default mongoose.model("Booking", BookingSchema)