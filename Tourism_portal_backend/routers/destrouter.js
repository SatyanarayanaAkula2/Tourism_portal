import express from "express";
import { getAllDestinations,getDestinationById,createDestination,updateDestination,deleteDestination } from "../controllers/dest_controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/destinations", getAllDestinations);
router.get("/destinations/:id",authMiddleware, getDestinationById);
router.post("/destinations",authMiddleware, createDestination);
router.put("/destinations/:id", authMiddleware,updateDestination);
router.delete("/destinations/:id", authMiddleware,deleteDestination);

export default router;