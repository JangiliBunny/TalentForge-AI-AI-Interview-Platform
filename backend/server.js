require("dotenv").config();

const express =require('express');
const cors=require('cors');
const app=express();
const connectDb=require("./config/db");

connectDb();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send("ai intrview platform");
})

app.listen(PORT, ()=>{
    console.log("applications is running on port 5000");
})