const Interview=require('../models/Interview');
const {evaluateInterviewWithAI} = require("../services/aiService");
const Question=require("../models/Question");
const Answer=require("../models/Answer");
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
                         .populate("questions", "title description difficulty topic");

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

const submitInterview = async (req, res) => {
    try {

        const { answers } = req.body;

        const interview = await Interview.findById(req.params.id).populate("questions");

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

       const interviewData = [];

        for (const item of answers) {
           const question = await Question.findById(item.questionId);

             interviewData.push({

              questionId: question._id,
              title: question.title,
              description: question.description,
            answer: item.answerText

           });
        }    
       const aiResult =await evaluateInterviewWithAI(interviewData);


         if ( !aiResult.answers || aiResult.answers.length !== interviewData.length) {
           return res.status(500).json({
           success: false,
           message: "AI evaluation failed."
        });}
 
       for(let i=0;i<answers.length;i++){

       await Answer.create({

        user:req.user.userId,

        interview:interview._id,

        question:interviewData[i].questionId,

        answerText:interviewData[i].answer,

        score:aiResult.answers[i].score,

        feedback:aiResult.answers[i].feedback

    });
  }

        interview.status = "completed";

        await interview.save();

        return res.status(200).json({

            success: true,

            message: "Interview submitted successfully.",

             overallScore:aiResult.overallScore,

             overallFeedback:aiResult.overallFeedback

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }
};

const getInterviewReport = async (req, res) => {
    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        const answers = await Answer.find({
            interview: req.params.id,
            user: req.user.userId
        }).populate(
            "question",
            "title description difficulty topic"
        );

        const totalQuestions = answers.length;

        const totalScore = answers.reduce(
            (sum, ans) => sum + ans.score,
            0
        );

        const averageScore =
            totalQuestions > 0
                ? Number(
                      (totalScore / totalQuestions).toFixed(2)
                  )
                : 0;

        return res.status(200).json({

            success: true,

            report: {

                interviewTitle: interview.title,

                role: interview.role,

                difficulty: interview.difficulty,

                totalQuestions,

                averageScore,

                overallFeedback:
                    "Great job! Keep practicing.",

                answers

            }

        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }
};

module.exports= {createInterview, getInterview,
                 getInterviewById, updateStatus,
                 getMyInterviews,submitInterview,
                 getInterviewReport
};