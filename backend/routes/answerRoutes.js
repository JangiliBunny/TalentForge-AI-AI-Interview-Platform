const express=require("express");
const router=express.Router();

const {createAnswer, getAnswerByInterview}=require("../controllers/answerController");
const auth=require("../middlewares/authMiddleware");


router.post("/", auth, createAnswer);

router.get("/interview/:interviewId", auth, getAnswerByInterview);

module.exports=router;