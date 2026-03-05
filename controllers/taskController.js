const taskModel=require('../models/taskmodel.js');

exports.createTask=async(req,res)=>{
    try{ 
        const {title,status}=req.body;
        const userId=req.user._id;
        const task=await taskModel.create({title,   
            status,
            timeSpent,
  
            userId});
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