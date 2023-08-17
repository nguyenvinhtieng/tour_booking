import mongoose from "mongoose";
const DiscountSchema = new mongoose.Schema({
    
},
{
    timestamps: true,
});

export default mongoose.model("Discount", DiscountSchema)