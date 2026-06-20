const Question=require('../models/Question');

const createQuestion= async(req, res) =>{
    try{
        const { title, description, difficulty, topic} =req.body;
       
        const question=  await Question.create({
            title,
            description,
            difficulty,
            topic,
            createdBy :req.user.userId,
        });

        return res.status(201).json({
            success:true,
            message:"question added successfully",
            question

        });

    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
}

module.exports={createQuestion};