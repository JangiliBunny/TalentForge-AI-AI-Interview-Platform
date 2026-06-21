const mongoose= require('mongoose');

const InterviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    role:{
       type:String,
       required:true,
    },

    difficulty:{
        type:String,
        enum:["Easy", "Medium", "Hard"],
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true,
    }],
    status:{
        type:String,
        enum:["pending", "completed"],
        default:"pending"
    },
},{
   timestamps:true
}
);

module.exports=mongoose.model("Interview", InterviewSchema);