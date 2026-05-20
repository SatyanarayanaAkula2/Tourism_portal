import mongoose from "mongoose";

const destSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image:{
    type:String,
  },
  images:{
    type:[String]
  },
  description:{
    type:String,
  },
  place:{
    type:String,
  },
  type:{
    type:String,
  },
  rating:{
    type:Number,
    default:0},
  price:{
    type:Number,
  },
  info:{
    type:String,
  },
  famousFor:{
    type:String,
  },
  bestTime:{
    type:String,

  }}
  ,{timestamps:true});

export default mongoose.model("Destination", destSchema);