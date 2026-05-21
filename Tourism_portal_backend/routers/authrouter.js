import express from 'express';
import { logout, signin,signup } from '../controllers/auth_controller.js';
import rateLimit from 'express-rate-limit';

const authlimiter=rateLimit({
    windowMs:10*60*1000,
    max:5,
    message:"Too many login attemps"
});

const router=express.Router();
router.post('/signup',signup);
router.post('/signin', authlimiter,signin);
router.post('/logout',logout);

export default router;