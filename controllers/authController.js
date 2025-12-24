const bcrypt=require('bcrypt')
const User=require("./models/usermodel.js")
const jwt=require("jsonwebtoken")

exports.registerUser=async(req,res)=>{
try{
    const{email,name,password}=req.body;
    
    if(!name || !password || !email){
        return res.status(400).json("all fields req");
    }
    let existingUser=await User.findOne({email});
    if (existingUser){
        return res.status(409).json("user already registered")
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

    return res.status(200).json("user successfully registered");

}catch(error){
    return res.status(400).json("ERROR");
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
        
        let isValid= await brcypt.compare(password,user.password);
        if(!isValid){
            return res.status(400).json("wrong password");
        }

        const token=jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET
        );
        

        res.json(token,"login successfull");
    }catch(error){
        res.status(400).send("something went wrong");
    }

};


exports.logout=(req,res)=>{ 
    res.json({message:"logout successful"})
}