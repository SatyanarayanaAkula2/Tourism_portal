import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

import connectDB from './config/db.js';
import bookingCron from './cron/bookingcron.js';
import app from './src/app.js';


const port =process.env.PORT||5000;
connectDB();
bookingCron();



app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});