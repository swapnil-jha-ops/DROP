const Task=require('../models/taskmodel');
const FocusSession=require('../models/focussession');   

exports.getDashboard=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userName=req.user.name;

        const alltasks=await Task.find({userId});

        const completedTasks=await Task.find({userId,status:'completed'});
        const pendingTasks=await Task.find({userId,status:'pending'});
        const ongoingTasks=await Task.find({userId,status:'ongoing'});

        const stats={
            total: alltasks.length,
            completed: completedTasks.length,
            pending: pendingTasks.length,
            ongoing: ongoingTasks.length
        };

         const focusSessions=await FocusSession.find({userId});

         const tasktimeMap={};

         let totalfocusTime=0;

         focusSessions.forEach(session=>{
            if(!session.endTime || !session.startTime) return;

            const duration=session.endTime - session.startTime;
            const taskId=session.taskId.toString();
            totalfocusTime+=duration;

            if(!tasktimeMap[taskId]){
                tasktimeMap[taskId]=0;
            }
            tasktimeMap[taskId]+=duration;
            });

            const taskwithTime=alltasks.map(task=>({ 
                ...task.toObject(),
                timeSpent:tasktimeMap[task._id.toString()]||0
    }));

        res.render('dashboard',{
            alltasks,
            stats,
            tasks:taskwithTime,
            totalfocusTime: totalfocusTime > 0 ? Math.round(totalfocusTime/(1000*60)) : 0,
            recentTasks:taskwithTime.slice(-5).reverse()

        });
    }catch(error){ 
        console.error('dashboard error', error);
        res.status(500).send('internal server error')
    }
};