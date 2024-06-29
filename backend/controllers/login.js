const express = require('express')
const router = express.Router()
const SuperUserModel = require('../schema/superUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



router.post('/adminLogin' , async (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
    // let confirmPassword = req.body.confirmPassword;
    const userInfo = await SuperUserModel.findOne({email:email});

    if(userInfo && userInfo!=null){
 
        let hashedPassword = userInfo.password;
        let verifyPassword = bcrypt.compareSync(password , hashedPassword)
        if(verifyPassword){
            var token = jwt.sign({email : email , password : password} , process.env.JWT_SECRET_KEY); 
            res.send({status:1 , message : 'Login Successfully' , token : token})
        }
        else{
            res.send({status:0 , message : 'Invalid Password'})
        }
    
    }
    else{
        res.send({status:0 , message : 'Email doesnot Exist in Database'})
    }
})

router.post('/adminRegister' , async (req,res)=>{
    const newAdmin = SuperUserModel();
    let email = req.body.email;
    let password = req.body.password;
    const userInfo = await SuperUserModel.findOne({email:email});
    if(userInfo && userInfo!=null){
        res.send({status:0 , message : "Email already registered"})
    }
    else{
        const hash = bcrypt.hashSync(password, 10);
        newAdmin.email = email;
        newAdmin.password = hash;
        admin = await newAdmin.save()
        if(admin){
            res.send({
                status: 1,
                message:"Successfully Registered!"
            })
        }
        else{
            res.send({
                status: 0,
                message:"Error in registration"
            })
        }
    }
})


module.exports = router