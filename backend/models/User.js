const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, " name is required"],
        trim: true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required:[true,"password is required"],

    },
    role:{
        type: String,
        enum:["admin", "student"],
        default:"student"
    },
  },
  {
    timestamps: true
  }
  
);

module.exports=mongoose.model("User", userSchema);