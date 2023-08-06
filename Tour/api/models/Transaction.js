import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled', 'failed'], required: true },
    remain: { type: Number, required: true },
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
},
{
    timestamps: true,
});

export default mongoose.model("Transaction", TransactionSchema)