const bcrypt=require("bcryptjs")
async function hashPassword(password){
    const salt=await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(password,salt)
    // console.log()
    return hashed
}

module.exports=hashPassword
