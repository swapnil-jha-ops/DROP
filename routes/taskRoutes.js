const express=require('express');
const router=express.Router();

const taskController=require('../controllers/taskController.js');
const protectRoute=require('../middleware/isauthenticated.js');

router.post('/create', protectRoute, taskController.createTask);

module.exports=router;
