import express from "express";
import { getAllDestinations,getDestinationById,createDestination,updateDestination,deleteDestination } from "../controllers/dest_controller.js";

const router = express.Router();

router.get("/destinations", getAllDestinations);
router.get("/destinations/:id", getDestinationById);
router.post("/destinations", createDestination);
router.put("/destinations/:id", updateDestination);
router.delete("/destinations/:id", deleteDestination);

export default router;