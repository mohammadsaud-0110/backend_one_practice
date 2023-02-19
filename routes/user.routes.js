const express=require("express");
const {UserModel}=require("../model/user.model");

const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userRouter=express.Router()
userRouter.use(express.json());

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        bcrypt.hash(password, 5,async (err, hash)=>{
            if(err){
                res.send({"msg":"Something went wrong","Error":err})
            }
            else{
                const user=new UserModel({name,email,password:hash})
                await user.save();
                res.send({"msg":"User Registered Successfully"})
            }
        });
    } 
    catch (error) {
        res.send({"msg":"Something went wrong","Error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai");
                    res.send({"msg":"Login Successfully","token":token})
                }
                else if(err){
                    res.send({"msg":"Wrong Password"});
                }
            })
        }
        else{
            res.send({"msg":"Email not registered"})
        }
    }
    catch (error) {
        res.send({"msg":"Unable to login","error":error.message})
    }
})

module.exports={
    userRouter
}
