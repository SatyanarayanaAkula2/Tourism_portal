import mongoose from "mongoose";

const hotelSchema=new mongoose.Schema({
    destinationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"destinations",
        required:true
    },
    name:{
        type:String,
        required:String
    },
    address:String,
    distanceFromDest:String,
    pricePerNight:Number,
    rating:Number,
    amenities:[String],
    images:[String]
},{timeStamp:true});

export default mongoose.model("Hotels",hotelSchema);