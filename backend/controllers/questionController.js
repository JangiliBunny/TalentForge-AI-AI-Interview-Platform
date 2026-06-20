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

const getAllQuestions=async(req, res)=>{
    try{
        const questions=await Question.find();

        return res.status(200).json({
            success:true,
            message:"all questions fetched successfully",
            count: questions.length,
            questions,
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};

const getQuestionById=async(req, res)=>{
  try{
   
    const question= await Question.findById(req.params.id).populate("createdBy", "name email");

    if(!question){
        return res.status(404).json({
            success:false,
            message:"No question found",
        });
    }

    return res.status(200).json({
        success:true,
        question,
    })
  }catch(err){
    console.log(err);

    return res.status(500).json({
        success:false,
        message:"internal server error",
    });
  }
};


const getAllQuestionsByquery=async (req, res)=>{
  try{
    const{ difficulty, topic}=req.query;
    
    let filter={};
    if(difficulty){
       filter.difficulty=difficulty;
    }

    if(topic){
        filter.topic=topic;
    }

    const questions=await Question.find(filter);

    return res.status(200).json({
        success:true,
        questions
    });
  }catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
  }
};

module.exports={createQuestion, getAllQuestions, getQuestionById, getAllQuestionsByquery};