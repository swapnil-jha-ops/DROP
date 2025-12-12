const mongoose=require('mongoose')
const bcrypt=require('brcypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
});

module.exports=mongoose.model("User",userSchema);
