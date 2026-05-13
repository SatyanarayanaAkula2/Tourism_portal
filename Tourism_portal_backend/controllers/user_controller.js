import User from '../models/users.js';

export const updateProfile=async(req,res)=>{
    try{
        const {name,mobile,place}=req.body;
        const updateuser=await User.findByIdAndUpdate(req.user.id,{
            name,mobile,place
        },{returnDocument:true});
        res.status(200).json({message:'Profile updated',user:{
            id:updateuser._id,name:updateuser.name,role:updateuser.role,
            email:updateuser.email,mobile:updateuser.mobile,place:updateuser.place
        }});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message
        });
    }
}

