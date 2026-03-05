const jwt=require("jsonwebtoken");
const user=require("../models/usermodel.js")

exports.isauthenticated=async(req,res,next)=>{
    try{
        console.log('🔐 isauthenticated middleware called');
        console.log('Cookies:', req.cookies);
        
        const token=req.cookies.token;
        if(!token){
            console.log('❌ No token found');
            return res.status(401).json("Unauthorized: No token provided");
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log('✅ Token decoded:', decoded);

        req.user=await user.findById(decoded.id).select("-password");
        console.log('👤 User found:', req.user);
        
        if(!req.user){ 
            console.log('❌ User not found in DB');
            return res.status(401).json("Unauthorized: User not found");
        }

        next();
    }catch(error){
        console.error("Authentication error:",error);
        return res.status(401).json("Unauthorized: Invalid token");
    }
};