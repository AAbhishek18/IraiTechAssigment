const   userModel=require('../models/userModel');
const   userProfileModel=require('../models/userProfileModel');
const   bcrypt=require('bcryptjs');
const   jwt=require('jsonwebtoken');
const   config=require('../config/config');

const aws = require('aws-sdk');


// aws configuration
aws.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKey: "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",
    region: "ap-aouth-1",
  });
  let uploadFile = async (files) => {
    return new Promise(function (resolve, reject) {
      let s3 = new aws.S3({ apiVersion: "2006-03-01" });
      var uploadParams = {
        ACL: "public-read",
        Bucket: "classroom-training-nucket",
        Body: files.buffer,
      };
  
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          return reject({ error: err });
        }
        console.log(data);
        console.log("file upload successfully");
        return resolve(data.Location);
      });
    });
  };

  //create a new user
  const createUser= async function (req,res){
  try {
    let user= req.body;
    let files=req.files;
    if (files && files.leength > 0) {
     var uploadFileURL = await uploadFile(files[0]);
     data.image = uploadFileURL;
   } else {
     return res.status(400).send({ msg: "No image found" });
   }
 
 //create a new user
 Body.image = uploadFileURL;
 let newUser= await userModel.create(user);
 res.status(201).send({msg:'User created successfully',data:newUser});
    
  } catch (error) {
    res.status(500).send({msg:'Error in creating user',error:error});
    
  }
  }
    //get all users
    const getAllUsers= async function (req,res){
        try {

            let users= await userModel.find();
            res.status(200).send({msg:'Users found successfully',data:users});
        } catch (error) {
            res.status(500).send({msg:'Error in finding users',error:error});
            
        }
        }

        //login a user
        const loginUser= async function (req,res){
          try {
            //empty request body
            let Body = req.body;
            let arr = Object.keys(Body);
           
        
            if (arr.length == 0) {
              return res
                .status(400)
                .send({ status: false, message: "Please provide login credential" });
            }
        
            //reading login credential
            let Email = req.body.email;
            let Password = req.body.password;
        
            //if email or password is missing
            if (!Email) {
              return res
                .status(400)
                .send({ status: false, Error: "Please enter an email address." });
            } else if (!Password) {
              return res
                .status(400)
                .send({ status: false, message: "Please enter Password." });
            } else {
              //fetch user with login credential
              let user = await userModel.findOne({ email: Email, password: Password });
              //no user found
              if (!user)
                return res.status(401).send({
                  status: false,
                  message: "Email or the Password is incorrect.",
                });
        
              //generate token
              let token = jwt.sign(
                {
                  userId: user._id.toString(),
                  batch: "uranium",
                  organisation: "FunctionUp",
                },
                "project3-uranium",
                { expiresIn: "1h" } //expires in 1hr
              );
              res.setHeader("x-api-key", token); //send token in response headers
              res.status(200).send({ status: true, message: token }); //send token in response body
            }
          } catch (error) {
            res.status(500).send({
              status: false,
              Error: "Server Error",
              message: error.message,
            });
          }
        };
            module.exports={createUser,getAllUsers,loginUser};

 