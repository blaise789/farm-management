const jwt=require("jsonwebtoken")
// const { decode } = require("punycode")
const   auth=async (req,res,next)=>{
    const token=req.header('Authorization')
    if (!token) return res.send({error:"token missing .."})
    try{
 const decoded= await jwt.verify(token.split('Bearer')[1],process.env.jwtPrivateKey)
   req.user=decoded
   next()
}
catch(err){
    return res.send("invalid token ").status(400)
}
}
module.exports=auth