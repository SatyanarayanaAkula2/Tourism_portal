import express from "express";
import { cancelBooking, createBooking, getAllBookings, getMyBookings } from "../controllers/booking_controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router=express.Router();

router.post('/create',authMiddleware,createBooking);
router.post('/cancel/:id',authMiddleware,cancelBooking);
router.get('/myBookings',authMiddleware,getMyBookings);
router.get('/bookings',authMiddleware,getAllBookings);

export default router;