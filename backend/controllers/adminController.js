const User=require("../models/User");
const Interview=require("../models/Interview");
const Question=require("../models/Question");
const Answer=require("../models/Answer");

const getAdminDashboard=async (req, res)=>{
    try{
        const totalUsers=await User.countDocuments();
        const totalQuestions = await  Question.countDocuments();
        const totalInterviews = await Interview.countDocuments();
        const completedInterviews=await Interview.countDocuments({
            status:"completed"
        });

        const answers=await Answer.find();
        const totalAnswers = answers.length;
        const totalScore = answers.reduce(
            (sum, answer) => sum + answer.score,
            0
        );

        const averageScore= totalAnswers > 0 ? Number((totalScore / totalAnswers).toFixed(2)) : 0;

        return res.status (200).json({
            success:true,
            stats:{
                totalAnswers,
                totalUsers,
                totalInterviews,
                completedInterviews,
                totalQuestions,
                averageScore,
            }
        })

    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

const getQuestions = async (req,res)=>{
    const questions = await Question.find();
    res.json({
        success:true,
        questions
    });
};

const deleteQuestion = async(req,res)=>{
    await Question.findByIdAndDelete(req.params.id);
    res.json({
        success:true
    });
};

const getInterviews = async(req,res)=>{
    const interviews = await Interview.find()
    .populate("user","name email")
    .populate("questions","title");
    res.json({
        success:true,
        interviews
    });
};

const deleteInterview = async(req,res)=>{
    await Interview.findByIdAndDelete(
        req.params.id
    );
    res.json({
        success:true
    });
};

module.exports={getAdminDashboard, getAllUsers,
    deleteUser,getQuestions, deleteQuestion,
    getInterviews, deleteInterview};