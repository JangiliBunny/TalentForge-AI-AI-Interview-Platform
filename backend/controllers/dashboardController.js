const User=require("../models/User");
const Interview=require("../models/Interview");
const Question=require("../models/Question");
const Answer=require("../models/Answer");

const getDashboardStats=async(req, res)=>{
    try{
        
        let totalUsers=await User.countDocuments();
        let totalInterviews=await Interview.countDocuments();
        let totalQuestions=await Question.countDocuments();

        let completedInterviews=await Interview.countDocuments({
                                    status: "completed"
                                 });
        
        const answers=await Answer.find();
        let totalAnswers=await Answer.countDocuments();
        
        let sum=0;
        for(let answer of answers){
            sum+=answer.score;
        }

        let averageScore= totalAnswers > 0 ? sum / totalAnswers : 0;

        return res.status(200).json({
            success:true,
            stats:{
                totalUsers,
                totalInterviews,
                totalQuestions,
                completedInterviews,
                totalAnswers,
                averageScore
            }
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
};


module.exports={getDashboardStats};