const express=require('express');
const router=express.Router();

const {createQuestion, getAllQuestions}=require('../controllers/questionController');
const auth =  require('../middlewares/authMiddleware');


router.post("/", auth, createQuestion);

router.get("/", auth, getAllQuestions);

module.exports=router;