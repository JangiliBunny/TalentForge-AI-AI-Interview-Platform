const Answer= require("../models/Answer");
const Interview=require("../models/Interview");

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
};

const evaluateAnswer= async(req, res)=>{
    try{
        const answer=await Answer.findById(req.params.id);

        if(!answer){
            return res.status(404).json({
                success:false,
                message:"answer not found",
            });
        }

        answer.score=8;
        answer.feedback="good explanation , its optimal solution with hashmap";

        answer.save();

        return res.status(200).json({
            success:true,
            message:"answer evaluated",
            answer,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};

const getInterviewReport= async(req, res)=>{
    try{
        const interviewId=req.params.id;

        const interview=await Interview.findById(interviewId);

        if(!interview){
            return res.status(404).json({
                success:false,
                message:"interview not found",
            });
        }

        const answers=await Answer.find({interview:interviewId});

        const totalQuestions=interview.questions.length;

        const totalAnswers=answers.length;

        let totalScore=0;

        for(let answer of answers){
            totalScore+=answer.score;
        }

        let averageScore= answers.length > 0 ? totalScore/answers.length : 0;

        return res.status(200).json({
            success:true,
            report:{
                totalQuestions,
                totalAnswers,
                averageScore,
                status:interview.status,
            }
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
}


module.exports={createAnswer , getAnswerByInterview,
                evaluateAnswer, getInterviewReport
};