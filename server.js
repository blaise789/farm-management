const animalController=require("./controllers/AnimalControllers")
const animalClassController=require("./controllers/AnimalClassController")
const userController = require('./controllers/UserController');
const authMiddleware = require('./middlewares/auth')
const authUser=require("./controllers/authUser")
const admin = require('./middlewares/admin')
const swaggerUi = require('swagger-ui-express');

const express=require("express")




if (process.env.NODE_ENV !=="production"){
    require("dotenv").config()
}
var app=express()
require('./initDb')();



// const bodyparser=require("body-parser")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyparser.urlencoded({extended:true}))
// app.use(bodyparser.json())




app.use('/v1/api/animals',authMiddleware,admin,animalController)
app.use('/v1/api/animalClasses',authMiddleware,admin,animalClassController)
app.use('/v1/api/users',userController)
app.use("/v1/api/auth/",authUser)

const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`listening request on port ${PORT}`)
})