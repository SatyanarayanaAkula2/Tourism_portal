import { getUser } from "../services/auth.js";

export const authMiddleware=(req,res,next)=>{ 
    try{
        const token=req.cookies?.accesstoken;
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        const user=getUser(token);
        req.user=user;
        next();
    }
    catch(error){
        return res.status(401).json({message:'invalid token'});
    }
};