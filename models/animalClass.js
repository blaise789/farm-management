const mongoose=require("mongoose")
const Joi=require("joi")
var itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 255,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 3
    }
})
const AnimalClass=mongoose.model("AnimalClass",itemSchema)
module.exports.AnimalClass=AnimalClass