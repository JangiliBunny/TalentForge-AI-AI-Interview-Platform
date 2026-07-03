const User=require("../models/User");
const Interview=require("../models/Interview");
const Question=require("../models/Question");
const Answer=require("../models/Answer");

// const getDashboardStats=async(req, res)=>{
//     try{
        
//         let totalUsers=await User.countDocuments();
//         let totalInterviews=await Interview.countDocuments();
//         let totalQuestions=await Question.countDocuments();

//         let completedInterviews=await Interview.countDocuments({
//                                     status: "completed"
//                                  });
        
//         const answers=await Answer.find();
//         let totalAnswers=await Answer.countDocuments();
        
//         let sum=0;
//         for(let answer of answers){
//             sum+=answer.score;
//         }

//         let averageScore= totalAnswers > 0 ?( sum / totalAnswers).toFixed(2) : 0;

//         return res.status(200).json({
//             success:true,
//             stats:{
//                 totalUsers,
//                 totalInterviews,
//                 totalQuestions,
//                 completedInterviews,
//                 totalAnswers,
//                 averageScore
//             }
//         });
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:"internal server error"
//         });
//     }
// };

const getDashboardStats = async (req, res) => {
    try {

        // Global statistics
        const totalUsers = await User.countDocuments();
        const totalQuestions = await Question.countDocuments();

        // Logged-in user's statistics
        const totalInterviews = await Interview.countDocuments({
            user: req.user.userId
        });

        const completedInterviews = await Interview.countDocuments({
            user: req.user.userId,
            status: "completed"
        });

        const answers = await Answer.find({
            user: req.user.userId
        });

        const totalAnswers = answers.length;

        const totalScore = answers.reduce(
            (sum, answer) => sum + answer.score,
            0
        );

        const averageScore =
            totalAnswers > 0
                ? Number((totalScore / totalAnswers).toFixed(2))
                : 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalQuestions,
                totalInterviews,
                completedInterviews,
                totalAnswers,
                averageScore
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


const getLeaderboard = async(req,res)=>{
    try{

        const leaderboard = await Answer.aggregate([{
                    $group:{
                        _id:"$user",
                        averageScore:{
                            $avg:"$score"
                        },
                        totalAnswers:{
                            $sum:1
                        }}},
                    {
                    $lookup:{
                        from:"users",
                        localField:"_id",
                        foreignField:"_id",
                        as:"user"
                    }
                },
                {
                    $unwind:"$user"
                },
                {
                    $project:{
                        _id:0,
                        name:"$user.name",
                        email:"$user.email",
                        averageScore:{
                            $round:[
                                "$averageScore",
                                2
                            ]
                        },
                        totalAnswers:1
                    }
                },
                {
                    $sort:{
                        averageScore:-1
                    }
                }
            ]);

        const rankedLeaderboard =leaderboard.map((user,index)=>({
                                   rank:index+1, ...user }));    

        return res.status(200).json({
            success:true,
            leaderboard:rankedLeaderboard
        });

    }catch(err){

        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error"
        });

    }
};

const getMyPerformance = async(req, res)=>{
    try{
        const answers=await Answer.find({user:req.user.userId});

        const totalAnswers=answers.length;

        const scores=answers.map(
            answer=>answer.score
        );
        
        const totalScore = answers.reduce((sum, answer) => sum + answer.score,0);

        const averageScore =totalAnswers > 0? Number((totalScore / totalAnswers).toFixed(2)): 0;

        // const averageScore= answers.length > 0 ? (scores.reduce((sum, score)=> sum+=score, 0)/ totalAnswers).toFixed(2):0;

        const highestScore=scores.length  > 0 ? Math.max(...scores): 0;

        const lowestScore=scores.length > 0 ? Math.min(...scores):0;

        const totalInterviews = await Interview.countDocuments({
                                  user: req.user.userId
                                });

        const completedInterviews = await Interview.countDocuments({
                                   user: req.user.userId,
                                  status: "completed"
                                });

        const recentAnswers=await Answer.find({
            user:req.user.userId
        }).populate("question", "title").sort({createdAt:-1}).limit(5).
         select("score feedback answerText");

        return res.status(200).json({
            success:true,
            performance:{
                totalInterviews,
                completedInterviews,
                totalAnswers,
                averageScore:Number(
                        averageScore.toFixed(2)
                    ),
                highestScore,
                lowestScore    
            },
            recentAnswers,
        })
    }catch(err){

        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error"
        });

    }
};


module.exports={getDashboardStats, getLeaderboard, getMyPerformance};