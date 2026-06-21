const express=require('express');
const router=express.Router();

const {createQuestion, getAllQuestions, getQuestionById, getAllQuestionsByquery, updateQuestion, deleteQuestion}=require('../controllers/questionController');
const auth =  require('../middlewares/authMiddleware');


router.post("/", auth, createQuestion);

router.get("/", auth, getAllQuestions);


router.get("/filter", auth, getAllQuestionsByquery);

router.get("/:id", auth, getQuestionById);

router.post("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);


module.exports=router;