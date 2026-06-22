const Answer= require("../models/Answer");

const createAnswer= async (req, res)=>{
    try{
        const {interview, question, user, answerText}=req.body;

        // if(!interview || !question || !user || !answerText){
        //     return res.status(401).json({
        //         success:false,
        //         message:"all fields are required",
        //     })
        // }

        const answer= await Answer.create({
            interview,
            question,
            user:req.user.userId,
            answerText
        });
        
        return res.status(201).json({
            success:true,
            message:"answer created",
            answer
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }
};

const getAnswerByInterview= async(req, res)=>{
    try{
        const answers=await Answer.find({interview: req.params.interviewId}).
                      populate("question", "title difficulty topic")
                     .populate("user", "name email");

        return res.status(200).json({
            success:true,
            message:"all answers",
            count:answers.length,
            answers,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }
}


module.exports={createAnswer , getAnswerByInterview};