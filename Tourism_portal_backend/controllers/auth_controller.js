import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import {setUser} from '../services/auth.js';

export const signup=async(req,res)=>{
    try{
    const {name,email,password,mobile,place}=req.body;
    if(!name||!email||!password){
        
        return res.status(400).json({message:'All fields are required'});
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        
        return res.status(400).json({message:'User already exists'});   
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
        name,email,password:hashedPassword,mobile,place
    });
    await user.save();
    const token=setUser(user);
    //send token as cookie
    res.cookie('accesstoken',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:15*60*1000, //15 minute
    });
    const userdata=user.toObject();
        delete userdata.password;
    res.status(200).json({message:"User Registered",user:userdata});
    }
    catch(error){
        res.status(500).json({
            error:"Internal server error"
        });
    }
}

export const signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const token=setUser(user);
        //send token as cookie
        res.cookie('accesstoken',token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:15*60*1000, //15 minute
        })
        const userdata=user.toObject();
        delete userdata.password;
        res.status(200).json({message:"User signed in",user:userdata});
    }
    catch(error){
        
        res.status(500).json({
            error:"Internal server error"
        });
    }
}

export const logout=(req,res)=>{
    res.clearCookie('accesstoken',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    });
    res.status(200).json({message:'User logged out'});
}

