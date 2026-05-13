import express from 'express';
import { updateProfile } from '../controllers/user_controller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router=express.Router();
router.put('/update',authMiddleware,updateProfile);
export default router;