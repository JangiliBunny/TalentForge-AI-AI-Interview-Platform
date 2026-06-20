const express=require('express');
const router=express.Router();

const {createQuestion}=require('../controllers/questionController');
const auth =  require('../middlewares/authMiddleware');


router.post("/", auth, createQuestion);

module.exports=router;