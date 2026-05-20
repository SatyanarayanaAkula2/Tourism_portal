import mongoose from "mongoose";

const packageSchema=new mongoose.Schema({
    destinationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Destination",
        required:true
    },
    name:{
        type:String,
    enum:[
        "Basic","Standard","Premium"
    ],
    required:true},
    price:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        default:"3 Days/2 Nights"
    },
    includes:[
        {
            type:String
        }
    ],
    description:{
        type:String
    },
    recommended:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

export default mongoose.model("Packages",packageSchema);