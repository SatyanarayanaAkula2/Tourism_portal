import Destination from "../models/destinations.js";

export const getAllDestinations = async (req, res) => {
    try {
        const dests = await Destination.find();
        res.status(200).json({ destinations: dests });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



export const getDestinationById = async (req, res) => {
    try {
        const dest = await Destination.findById(req.params.id);
        if (!dest) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.status(200).json({ destination: dest });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createDestination = async (req, res) => {
    try {
        const newDest = new Destination(req.body);
        const savedDest = await newDest.save();
        res.status(201).json({ destination: savedDest });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }   
};

export const updateDestination = async (req, res) => {
    try {
        const updatedDest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.status(200).json({ destination: updatedDest });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteDestination = async (req, res) => {
    try {
        const deletedDest = await Destination.findByIdAndDelete(req.params.id);
        if (!deletedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};