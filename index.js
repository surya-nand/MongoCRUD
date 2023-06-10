const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

const Employee = mongoose.model("employee", {
  name: String,
  age: Number,
});

app.get("/", (req, res) => {
  res.json({ message: "All good!" });
});

app.get("/employees", (req, res) => {
  // return all the students inside the 'employees' collection in the database
  //Fetching data from DB
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => console.log("Error in fetching employees", error));
});

app.post('/employees',(req,res) =>{
    //posting data to DB
    const employee = new Employee({
        name: 'Anand',
        age: 21,
    })
    employee.save().then((employee) =>{
        res.send(employee)
    }).catch((error) => {
        res.send("Error in loading new employee details",error)
    })
})
app.put('/employees/:id',(req,res) =>{
    // Update the details in DB  using id 
    let {id} = req.params
    const {age} = req.body;
    Employee.findByIdAndUpdate(id,{
        age : age
    }).then((employee) => {
        res.json("Employee details updated",employee)
    }).catch((error)=>{
        res.json('Employee details update failed', error)
    })
}
)

app.delete('/employees/:id',(req,res) =>{
    // Delete the details in DB  using id 
    let {id} = req.params
    const {age} = req.body;
    Employee.findByIdAndUpdate(id,{
        age : age
    }).then((employee) => {
        res.json("Employee details deleted",employee)
    }).catch((error)=>{
        res.json('Employee details delete failed', error)
    })
}
)

app.listen(process.env.SERVER_PORT, () => {
  mongoose
    .connect(process.env.MONGO_SERVER, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => console.log("Database connection failed", error));
  console.log("Port is running successfully");
});
