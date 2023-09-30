const _=require("lodash")
const express=require("express")
const { AnimalClass}=require("../models/animalClass")
const router=express.Router()
 router.get("/" ,async (req,res)=>{
    const items=await AnimalClass.find().sort({name:1})
    return res.send(items)

    
 })
router.post("/",async (req,res)=>{
    try{
    //     const {error}= await validate(req.body)
    //    if(error) return res.send(error.message).status(400)
        const  itemExists=await AnimalClass.findOne({name:req.body.name})
        if (itemExists) return res.send({
     error:"item already registered"
        })
        const item= await new AnimalClass(_.pick(req.body,['name','description']))
         await item.save()
     return res.json(item).status(201)
    }
    catch(err){
        console.log(err.message)
    }

})
module.exports=router