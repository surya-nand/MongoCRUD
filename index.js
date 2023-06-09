const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

const Employee = mongoose.model('employee',{
    name: String,
    age: Number
})


app.get("/",(req,res)=>{
    res.json({message: 'All good!'})
})
app.listen(process.env.SERVER_PORT,() => {
    mongoose
  .connect(process.env.MONGO_SERVER, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(() => console.log("Database Connected Successfully"))
  .catch((error)=> console.log("Database connection failed",error))
    console.log("Port is running successfully")
})