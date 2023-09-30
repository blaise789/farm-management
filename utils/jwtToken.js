const sendToken=(user,statusCode,res)=>{
    const token=user.generateAuthToken()
    const options={

        expires:new Date(Date.now()*90*24*60*60*1000),
        httpOnly:true,
        samesite:"none",
        secure:true
}
 return res.staus(statusCode).cookie("token",token,options).json({
    success:true,
    user,token
 }
 )
}
 module.exports=sendToken