const bcrypt=require('bcrypt')
const User=require("../models/usermodel.js")
const jwt=require("jsonwebtoken");
const { StrictMode } = require('react');

exports.registerUser=async(req,res)=>{
try{
    const{email,name,password,confirmPassword}=req.body;
    
    if(!name || !password || !email){
        return res.render('register', {error: "All fields are required"});
    }
    
    if(password !== confirmPassword){
        return res.render('register', {error: "Passwords do not match"});
    }
    
    let existingUser=await User.findOne({email});
    if (existingUser){
        return res.render('register', {error: "User already registered with this email"});
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);

    const user=await User.create(
        {
            name,
            email,
            password:hashedpassword
        }
    );

    return res.redirect('/api/auth/login'); 

}catch(error){
    console.error("Registration error:", error);
    return res.render('register', {error: error.message || "Registration failed. Please try again."});
}
};


exports.loginUser=async(req,res)=>{ 

    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json("Something Went Wrong");
        }
        
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json("email not registered");
        }
        
        let isValid= await bcrypt.compare(password,user.password);
        if(!isValid){
            return res.status(400).json("wrong password");
        }

        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not configured");
        }
        
        const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET
        );
        
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:24*60*60*1000
        });
        return res.redirect('/api/user/dashboard');

        }catch(error){
        console.error("Login error:", error);
        res.status(400).json({error: error.message || "Login failed"});
    }

};


exports.logout=(req,res)=>{ 
    res.clearCookie("token").redirect('/api/auth/login');
}