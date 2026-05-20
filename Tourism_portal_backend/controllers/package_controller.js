import Package from "../models/packages.js";


export const getPackages =
async(req,res)=>{

  try{

    const packages =
    await Package.find();

    res.status(200).json({
      packages:packages
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



export const getPackagesByDestination =
async(req,res)=>{

  try{

    const packages =
    await Package.find({

      destinationId:req.params.id

    });

    res.status(200).json({
      packages:packages
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};


export const createPackage =
async(req,res)=>{

  try{

    const packageData =
    await Package.create(req.body);

    res.status(201).json({
      package:packageData
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};