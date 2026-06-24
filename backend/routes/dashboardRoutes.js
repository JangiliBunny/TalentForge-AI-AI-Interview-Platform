const express=require('express');
const router=express.Router();

const auth=require("../middlewares/authMiddleware");

const {getDashboardStats, getLeaderboard, getMyPerformance}=require("../controllers/dashboardController");

router.get("/stats", auth, getDashboardStats);
router.get("/leader", auth, getLeaderboard);
router.get("/performance", auth, getMyPerformance);

module.exports=router;