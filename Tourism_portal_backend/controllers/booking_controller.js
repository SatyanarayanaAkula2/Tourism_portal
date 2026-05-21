import bookings from "../models/booking.js";

export const createBooking=async(req,res)=>{
    try{
        const booking=await bookings.create({
            ...req.body,
            userId:req.user.id
        });
        res.status(201).json({
            booking:booking
        });
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        });
    }
};

export const cancelBooking=async(req,res)=>{
    try{
        const booking=await bookings.findByIdAndUpdate(
            req.params.id,
            {status:"Cancelled"},
            {new:true}
        );
        res.status(200).json({
            booking:booking
        });
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getMyBookings=async(req,res)=>{
    try{
        const bookingData=await bookings.find({
            userId:req.user.id
        });
        res.status(200).json({
            bookings:bookingData
        });
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getAllBookings=async(req,res)=>{
    try{
        const bookingData =
        await bookings.find()
        .sort({
            createdAt:-1
        });
        res.status(200).json({
            bookings:bookingData
        });
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}