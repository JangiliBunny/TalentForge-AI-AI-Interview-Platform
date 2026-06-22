const express=require("express");
const router=express.Router();

const {createAnswer, getAnswerByInterview,
        evaluateAnswer, getInterviewReport}=require("../controllers/answerController");
const auth=require("../middlewares/authMiddleware");


router.post("/", auth, createAnswer);

router.get("/interview/:interviewId", auth, getAnswerByInterview);

router.post("/:id/evaluate", auth , evaluateAnswer);

router.get("/report/:id", auth, getInterviewReport);

module.exports=router;