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
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
}

const getAllQuestions=async(req, res)=>{
    try{
        const questions=await Question.find().populate("createdBy", "name email");;

        return res.status(200).json({
            success:true,
            message:"all questions fetched successfully",
            count: questions.length,
            questions,
        })
    }catch(err){
        console.error(err);

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
    console.error(err);

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

    const questions=await Question.find(filter).populate("createdBy", "name email");

    return res.status(200).json({
        success:true,
        questions
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
  }
};

const updateQuestion=async(req, res)=>{
    try{
        const question=await Question.findByIdAndUpdate( 
            req.params.id,
            req.body,{
                new:true,
                runValidators:true,
            }
        ) .populate("createdBy", "name email");

        if(!question){
            return res.status(401).json({
                success:false,
                message:"Question not Found",
            });
        }

        return res.status(201).json({
            success:true,
            Message:"question updated successfully",
            question
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
        success:false,
        message:"internal server error"
      });
    }
};

const deleteQuestion= async (req, res)=>{
    try{
        const question= await Question.findByIdAndDelete(
            req.params.id,
            req.body,{
                new :true,
                runValidators:true,
            }
        );

        if(!question){
            return res.status(401).json({
                success:false,
                message:"Question not found",
            })
        }

        return res.status(201).json({
            success:true,
            message:"question deleted",
            question
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};

module.exports={
                 createQuestion, getAllQuestions, 
                 getQuestionById, getAllQuestionsByquery,
                 updateQuestion , deleteQuestion
                };