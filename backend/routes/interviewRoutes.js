const express=require('express');
const auth=require('../middlewares/authMiddleware');

const {createInterview}= require("../controllers/interviewController");


const router= express.Router();

router.post("/", auth , createInterview);

module.exports=router;