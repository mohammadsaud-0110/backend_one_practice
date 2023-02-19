const express=require("express");
const {connection}=require("./mongoose")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {authenticate}=require("./middleware/note.middleware")
const cors = require("cors")
require('dotenv').config()


const app=express()
app.use(cors())
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Home Page Notebook")
})

app.use("/user",userRouter);
app.use(authenticate)
app.use("/note",noteRouter);


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Failed to connect to DB")
        
    }
    console.log("Server port :",process.env.port);
})