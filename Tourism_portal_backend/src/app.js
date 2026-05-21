import express from 'express';
import cors from 'cors';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import rateLimit from "express-rate-limit";
import AuthRouter from '../routers/authrouter.js';
import UserRouter from '../routers/userrouter.js';
import DestRouter from '../routers/destrouter.js';
import HotelRouter from'../routers/hotelrouter.js';
import PackageRouter from '../routers/packagerouter.js';
import BookingRouter from '../routers/bookingroute.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from '../middlewares/authmiddleware.js';
import User from '../models/users.js';

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many requests,please try again later."
})

const app=express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({crossOriginResourcePolicy:{
    policy:"cross-origin"
},contentSecurityPolicy:false}));
app.use(limiter);
app.use('/uploads',express.static('uploads'));


app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/destination', DestRouter);
app.use('/hotel',HotelRouter);
app.use('/package',PackageRouter);
app.use('/booking',BookingRouter);


app.get('/me',authMiddleware,async(req,res)=>{
    const user=await User.findById(req.user.id).select('-password');
    res.status(200).json({user:user});
});
app.get('/',(req,res)=>{
    res.send('api is running uuu...');
});

export default app;