import express from "express";
import { cancelBooking, createBooking, getAllBookings, getMyBookings } from "../controllers/booking_controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import adminonly from "../middlewares/adminonly.js";


const router=express.Router();

router.post('/create',authMiddleware,createBooking);
router.post('/cancel/:id',authMiddleware,cancelBooking);
router.get('/myBookings',authMiddleware,getMyBookings);
router.get('/bookings',adminonly,getAllBookings);

export default router;