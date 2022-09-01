const mongoose=require('mongoose');

const signupSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
       
    }
})