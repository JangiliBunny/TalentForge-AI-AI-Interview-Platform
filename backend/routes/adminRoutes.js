const express=require("express");
const router = express.Router();

const admin =require("../middlewares/adminMiddleware");
const auth=require("../middlewares/authMiddleware");

const {getAdminDashboard,getAllUsers,
    deleteUser,getQuestions, deleteQuestion,
    getInterviews, deleteInterview}=require("../controllers/adminController");

router.get("/dashboard", auth, admin, getAdminDashboard);

router.get("/users", auth, admin, getAllUsers);

router.delete("/users/:id", auth, admin, deleteUser);

router.get("/questions", auth, admin, getQuestions);

router.delete("/questions/:id", auth, admin, deleteQuestion);

router.get("/interviews", auth, admin, getInterviews);

router.delete("/interviews/:id", auth, admin, deleteInterview);

module.exports=router;