import express from 'express';

import { getHotels,getHotelsByDestination,createHotel } from '../controllers/hotel_controller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router=express.Router();

router.get('/gethotels',authMiddleware, getHotels);
router.get('/destination/:id',authMiddleware,getHotelsByDestination);
router.post('/addhotel',authMiddleware,createHotel);

export default router;