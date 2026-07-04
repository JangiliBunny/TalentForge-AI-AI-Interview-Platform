const bycript=require('bcryptjs');
const User=require('../models/User');
const jwt = require('jsonwebtoken');

const register=async(req, res)=>{

    try{
        const {name , email , password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All felids are required",
            });
        }
       
        const existingUser=  await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists",
            });
        }

        const hashedpassword=await bycript.hash(password, 10);

        const user= await User.create({
            name,
            email,
            password : hashedpassword
        });

        return res.status(200).json({
            success:true,
            message:"user registred successfully",

            user:{
                _id:user._id,
                name: user.name,
                email:user.email
            }
        });
    } catch(err){
          console.error(err);
        return res.status(500).json({
            success:false,
            message:"server issue",
        });
    }
};

const login= async(req, res)=>{
    try{
        const {email , password} = req.body;

        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid Credentials"
            })
        }
       
        const isMatch= await bycript.compare(
            password, 
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid Credentials"
            })
        }

       const token= jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn:"7d"
        }
       );
     
       return res.status(200).json({
        success:true,
        token,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
       });
    }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"internal server issue"
        });
    }
};

const profile= async (req, res)=>{
    return res.status(200).json({
        success:true,
        message:"profile approved",
        user : req.user
    });
};


const getMe= async(req , res)=>{
    try{
        const user= await User.findById(req.user.userId).select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        return res.status(200).json({
            success:true,
            user
        });
    }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"internal error"
        });
    }
};

const updateProfile = async (req,res)=>{
    const {name}=req.body;
    const user=await User.findByIdAndUpdate(
        req.user.userId,
        {name},
        {new:true}
    );
    res.json({
        success:true,
        user
    });
};

const changePassword = async(req,res)=>{
    const {
        oldPassword,
        newPassword
    }=req.body;
    const user=await User.findById(
        req.user.userId
    );
    const isMatch=await bycript.compare(
        oldPassword,
        user.password
    );
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Old password is incorrect."
        });
    }
    user.password=await bycript.hash(
        newPassword,
        10
    );
    await user.save();
    res.json({
        success:true,
        message:"Password updated successfully."
    });
}


module.exports={register , login, profile, getMe, updateProfile,changePassword};