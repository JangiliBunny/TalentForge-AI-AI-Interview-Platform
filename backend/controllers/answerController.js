const Answer= require("../models/Answer");
const Interview=require("../models/Interview");
const Question = require("../models/Question");

const {evaluateAnswerWithAI} = require("../services/aiService");

const createAnswer= async (req, res)=>{
    try{
        const {interview, question, user, answerText}=req.body;

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
        console.error(err);
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
        console.error(err);
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

        const question=await Question.findById(answer.question);
        try{
            const aiResult =await evaluateAnswerWithAI(
                          question.description,
                          answer.answerText);

         answer.score=aiResult.score;
         answer.feedback=aiResult.feedback;
        }catch(err){
            answer.score = 5;

          answer.feedback ="Evaluation temporarily unavailable.";
         }
        

        await answer.save();

        return res.status(200).json({
            success:true,
            message:"answer evaluated",
            answer,
        });
    }catch(err){
        console.error(err);
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

        const scores = answers.map(answer => answer.score);
        const highestScore =scores.length > 0? Math.max(...scores): 0;
        const lowestScore =scores.length > 0? Math.min(...scores): 0;
        const completionPercentage =totalQuestions > 0 ? Number((
                (totalAnswers / totalQuestions) * 100 ).toFixed(2)): 0;

        return res.status(200).json({
            success:true,
            report:{
                totalQuestions,
                totalAnswers,
                averageScore,
                highestScore,
                lowestScore,
                completionPercentage,
                status:interview.status,
            }
        })
        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};




module.exports={createAnswer , getAnswerByInterview,
                evaluateAnswer, getInterviewReport
};