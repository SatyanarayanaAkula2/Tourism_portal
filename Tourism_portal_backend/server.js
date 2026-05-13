import connectDB from './config/db.js';
import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();
const port =process.env.port||5000;
connectDB();

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});