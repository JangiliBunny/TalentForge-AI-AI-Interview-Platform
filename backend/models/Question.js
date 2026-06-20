const mongoose=require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },

    difficulty:{
        type:String,
        enum:["Easy", "Medium","Hard"],
        required:true,
    },
    topic:{
         type:String,
         required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
}
);

module.exports=mongoose.model("Question", QuestionSchema);