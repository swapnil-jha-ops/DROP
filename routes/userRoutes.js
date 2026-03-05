const express=require('express');
const router=express.Router();
const { isauthenticated } = require('../middleware/isauthenticated.js');
const { getDashboard }=require('../controllers/dashcontroller.js')

router.get('/dashboard', isauthenticated, getDashboard )

router.get('/profile',isauthenticated, (req,res)=>{
    res.render("profile", { user: req.user });
})


module.exports=router;