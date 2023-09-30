const _=require("lodash")
const express=require("express")
const { Animal } = require("../models/animal.model")
// Animal,validate

var router=express.Router()
router.get("/",async (req,res)=>{
    const items=await Animal.find().sort({name:1})
    return res.json(items).status(200)
})
router.post('/',async (req,res)=>{
    try{
const itemExists=await Animal.findOne({name:req.body.name})
   if (itemExists) res.send({error:"item already registered"}).status(400)
   const item=new Animal(
_.pick(
req.body,['name','description','animalClassId']
)
    )
await item.save()

return res.send(_.pick(item,['_id','name','description','animalClassId'])).status(200)
    }
    catch(err){
       return res.json(err.message).status(500)
    }
})
module.exports=router