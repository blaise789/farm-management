const mongoose=require("mongoose")
const Joi=require("joi")
// const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
var userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxlength:255,
        minlength:3
    },
    password:{
        type:String,
        required:true,
        unique:true,
        maxlength:1024,
        minlength:3
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
   
})
userSchema.methods.generateAuthToken=function (){
    const token=jwt.sign(
        {
            _id:this._id,name:this.name,email:this.email,password:this.password,isAdmin:this.isAdmin
        },
    process.env.jwtPrivateKey,
    {expiresIn:'1h'}
    )
    return token
}
const User =mongoose.model("User",userSchema)
// function validateUser(user){
// //     const schema={
// // name:Joi.string().max(255).min(3),
// // email:Joi.string().max(255).min(3).required().email(),
// // password:Joi.string().max(255).min(3),
// // isAdmin:Joi.required()



// //     }
// //     return Joi.validate(user,schema)
// // }
module.exports.User=User
// module.exports.validate=validateUser