const brcypt=require('bcrypt')
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
    const hashedpassword=await bcypt.hash(password,salt);

    const user=User.create(
        {
            name,
            email,
            password:hashedpassword
        }
    );

    return res.send(200).json("user successfully registered");

}catch(error){
    return res.send(400).json("ERROR");
}
};


exports.loginUser=async(req,res)=>{ 

    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.send(400).json("Something Went Wrong");
        }
        
        const user=User.findOne({email});
        if(!user)

    }

}