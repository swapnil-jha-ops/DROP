const taskModel=require('../models/taskmodel.js');

console.log('✅ taskController.js loaded');

exports.createTask=async(req,res)=>{
    console.log('🔵 createTask called');
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);
    
    try{ 
        const {title,status}=req.body;
        const userId=req.user._id;
        
        console.log('userId:', userId);
        
        const task=await taskModel.create({
            title,   
            status,
            userId
        });
        
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            task
        })
    }catch(error){
        console.error("Error creating task:", error);
        res.status(500).json({
            success:false,
            message:"Failed to create task",
            error:error.message
        })
    }   
}