const mongoose = require("mongoose")


async function connectDB(){
    try{
       
        await mongoose.connect("mongodb://localhost:27017/paytm")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB