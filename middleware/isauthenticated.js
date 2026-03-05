const jwt=require("jsonwebtoken");
const user=require("../models/usermodel.js")

exports.isauthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json("Unauthorized: No token provided");
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=await user.findById(decoded.id).select("-password");
        
        if(!req.user){ 
            return res.status(401).json("Unauthorized: User not found");
        }

        next();
    }catch(error){
        console.error("Authentication error:",error);
        return res.status(401).json("Unauthorized: Invalid token");
    }
    };