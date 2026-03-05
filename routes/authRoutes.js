const express=require('express');
const router=express.Router();
const authController=require("../controllers/authController.js");
const { isauthenticated } = require('../middleware/isauthenticated.js');

router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/logout',isauthenticated,authController.logout);

router.get('/register', (req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render("login"); 
})


module.exports=router;