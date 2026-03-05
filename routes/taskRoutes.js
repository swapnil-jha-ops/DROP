const express=require('express');
const router=express.Router();

const taskController=require('../controllers/taskController.js');
const { isauthenticated } = require('../middleware/isauthenticated.js');

console.log('✅ taskRoutes.js loaded');
console.log('isauthenticated middleware:', typeof isauthenticated);
console.log('createTask handler:', typeof taskController.createTask);

router.post('/create', isauthenticated, taskController.createTask);

module.exports=router;
