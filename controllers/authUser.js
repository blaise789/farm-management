const hashPassword=require("../utils/hash")
const bcrypt = require('bcryptjs')
const authMiddleware=require("../middlewares/auth")

const _ = require('lodash')
const express = require('express');
const { User } = require('../models/user.model');
const sendToken = require("../utils/jwtToken");
var router=express.Router()
router.post("/login",authMiddleware,async (req,res)=>{
   try {
 const user=await User.findOne({email:req.body.email})
 if(!user) return res.send("invalid email or password")
 const validPassword=await bcrypt.compare(req.body.password,user.password)
if(!validPassword) return res.send("invalid email or password ").status(401)
// const token=await user.generateAuthToken()

sendToken(user,200,res)



}
   

catch(err){
    return res.json(err.message).status(500)
}
})
router.post('/register', async (req, res) => {
    try{
    //  const {name,email,password}=req.body
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) return res.send('user already registered').status(400)
    const user=await new User(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
  const hashed=await hashPassword(user.password)
  user.password=hashed
  await user.save()

}
    catch(err){
        return res.json(err.message).status(500)
    }

});