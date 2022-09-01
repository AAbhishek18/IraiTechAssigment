const mongoose=require('mongoose');//import mongoose

//create schema for user profile
const userModel=new mongoose.Schema({
    name:{ type:String,
         required:true 
        },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{ type:String}
});
module.exports=mongoose.model('User',userModel);//Users is the name of the collection in mongodb and userModel is the schema of the collection.
//