const mongoose=require('mongoose');

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("db connections successfull");
    }catch(err){
        console.error("MongoDB Connection Error:");
        console.log(err);
        process.exit(1);
    }
   
};

module.exports =connectDb;