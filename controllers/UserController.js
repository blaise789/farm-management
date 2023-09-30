const hashPassword=require("../utils/hash")
const _=require("lodash")
const express=require("express")
const {User}=require("../models/user.model")
var router=express.Router()
router.get("/all",async (req,res)=>{
    
    const users=await User.find().sort({name:1})
    return res.json(users).status(200)
})
router.get("/:email",async (req,res)=>{
    const user=await User.find({email:req.params.email})
    return res.send(user)
})
router.post("/",async (req,res)=>{
    try{
const userExists= await User.findOne({email:req.body.email})
if(userExists)  return res.send({error:"user arleady registered"}).status(400)

    
const user =new User(_.pick(req.body,['name','email','password','isAdmin']))

const hashed=await hashPassword(user.password)
user.password=hashed

await user.save()
return res.json(user).status(200)
    }
    catch(err){
return res.json(err.message).status(500)
    }
    
})
router.post('/',async (req,res)=>{
 const userExists=await User.findOne({email:req.body.email})
 if (!userExists) return res.send({error:"user arleady registerd "}).status(400) 
// const user=new User.pick()
const user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
const hashed = await hashPassword(user.password)
    user.password = hashed
    await user.save()
    return res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin'])).status(201)

}

  
)
module.exports=router