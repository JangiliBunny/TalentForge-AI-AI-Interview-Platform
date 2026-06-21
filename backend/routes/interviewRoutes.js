const express=require('express');
const auth=require('../middlewares/authMiddleware');

const {createInterview, getInterview, getInterviewById, updateStatus}= require("../controllers/interviewController");


const router= express.Router();

router.post("/", auth , createInterview);

router.get("/", auth, getInterview);


router.get("/:id", auth, getInterviewById);

router.put("/:id/status", auth, updateStatus);


module.exports=router;