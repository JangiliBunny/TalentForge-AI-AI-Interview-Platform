const express=require('express');
const auth=require('../middlewares/authMiddleware');

const {createInterview, getInterview, getInterviewById, updateStatus,getMyInterviews,submitInterview}= require("../controllers/interviewController");


const router= express.Router();

router.post("/", auth , createInterview);

router.get("/", auth, getInterview);

router.get("/me/interviews", auth, getMyInterviews);

router.get("/:id", auth, getInterviewById);

router.put("/:id/status", auth, updateStatus);

router.post("/:id/submit", auth, submitInterview);


module.exports=router;