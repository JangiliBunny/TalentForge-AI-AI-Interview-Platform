const mongoose=require('mongoose');

const answerSchema =new mongoose.Schema({
     interview:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Interview",
        required:true,
     },
     question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true,
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
     },
     answerText:{
        type:String,
        required:true,
     },
     score:{
        type:Number,
        default:0,
     },
     feedback:{
        type:String,
        default:"",
     }
  },{
    timestamps:true,
  }
);

module.exports=mongoose.model("Answer" , answerSchema);