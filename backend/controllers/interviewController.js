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

const getInterview =async(req, res)=>{
    try{
        const interviews= await Interview.find() .populate("user", "name email")
                          .populate("questions", "title difficulty topic");;

        return res.status(200).json({
            success:true,
            message:"total interviews",
            count: interviews.length,
            interviews,
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
};

const getInterviewById= async(req, res)=>{
    try{
        const interview=await Interview.findById(req.params.id).populate("user", "name email")
                         .populate("questions", "title difficulty topic");

        if(!interview){
            return res.status(401).json({
                success:false,
                message:"interview not found",
            });
        }  
        
        return res.status(201).json({
            success:true,
            message:"interview is fetched",
            interview,
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};

const updateStatus= async (req, res)=>{
    try{
        const {status}= req.body;

        const interview=await Interview.findByIdAndUpdate(
            req.params.id , {status},{
                runValidators:true,
                returnDocument:"after",
            }
        );

        if(!interview){
            return res.status(401).json({
                success:false,
                message:"interview is not found",
            });
        }

        return res.status(201).json({
            success:true,
            message:"status : completed",
            interview
        });
    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};


const getMyInterviews =async(req, res)=>{
    try{
        const interview= await Interview.find({
            user:req.user.userId,
        }).populate("questions","topic difficulty").
        populate("user", "name email");

        return res.status(200).json({
            success:true,
            count: interview.length,
            interview
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
};

module.exports= {createInterview, getInterview,
                 getInterviewById, updateStatus,
                 getMyInterviews,
};