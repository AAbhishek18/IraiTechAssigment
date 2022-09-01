const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const multer=require('multer');
const route=require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer().any());



mongoose.connect('mongodb+srv://AAbhishek2022:1ESrG6kzyaqzUE3p@cluster0.am17a.mongodb.net/IraiTechDB',
{useNewUrlParser:true
}).then(()=>{console.log('connected to mongodb')}).catch(err=>{console.log(err)});

app.use("/",route)

app.listen(process.env.PORT || 3000,function(){
    console.log('server is running on port 3000' + (process.env.PORT || 3000))});
