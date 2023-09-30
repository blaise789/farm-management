const mongoose=require("mongoose")
const Joi=require("joi")
var itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3,

    },
    description:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3,
        unique:true
    },
    animalClassId:{
        type:mongoose.Types.ObjectId,

        required:true
    }

})
const Animal=mongoose.model("Animal",itemSchema)
function validateItem(item){
    const schema={
        name:Joi.string().max(255).min(3)
    
    
    }
    return Joi.validate(item,schema)
}
module.exports.Animal=Animal
module.exports.validate=validateItem