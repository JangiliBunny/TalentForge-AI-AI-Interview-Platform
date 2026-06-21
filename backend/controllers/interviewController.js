const Interview=require('../models/Interview');

const createInterview=async(req, res)=>{
    try{
        const{title, role, difficulty, questions}=req.body;

        const interview= await Interview.create({
            title,
            role,
            difficulty,
            questions,
            user:req.user.userId,
        });

        return res.status(200).json({
            success:true,
            message:"Interview created successfully",
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server issue"
        });
    }
};

module.exports= {createInterview};