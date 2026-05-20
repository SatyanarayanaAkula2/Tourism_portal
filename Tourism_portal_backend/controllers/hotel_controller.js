import hotels from "../models/hotels.js";

export const getHotels=async(req,res)=>{
    try{
        const Hotels=await hotels.find();
        res.status(200).json({
            hotels:Hotels
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getHotelsByDestination =
async(req,res)=>{

  try{

    const Hotels =
    await hotels.find({

      destinationId:req.params.id

    });

    res.status(200).json({
      hotels:Hotels
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const createHotel =
async(req,res)=>{

  try{

    const Hotel =
    await hotels.create(req.body);

    res.status(201).json({
      hotel:Hotel
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
