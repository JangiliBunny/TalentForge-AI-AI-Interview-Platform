const express=require('express');
const router=express.Router();

const auth=require("../middlewares/authMiddleware");

const {getDashboardStats}=require("../controllers/dashboardController");

router.get("/stats", auth, getDashboardStats);

module.exports=router;