const mongoose = require('mongoose');
//creating database
mongoose.connect("mongodb://localhost:27017/portfoliodb").then(()=>{
    console.log("Connection successful")
}).catch((error)=>{
    console.log(error);
})