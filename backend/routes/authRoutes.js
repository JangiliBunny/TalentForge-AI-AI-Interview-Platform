const express=require('express');
const router=express.Router();

const {register, login, profile, getMe,updateProfile,changePassword}=require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');



router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth , profile);

router.get("/me" , auth ,getMe);

router.put("/profile",auth, updateProfile);

router.put("/change-password", auth, changePassword);





module.exports=router;