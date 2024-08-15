const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const PORT = 5000;
const connectDB = require('./db')

app.use(express.json());


app.get('/' , (req,res) =>{
    res.send("Home route");

})

app.use('/api/v1' , mainRouter);

 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})

