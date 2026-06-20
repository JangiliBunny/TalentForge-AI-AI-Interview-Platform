require("dotenv").config();

const express =require('express');
const cors=require('cors');
const app=express();
const connectDb=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const QuestionRoutes=require("./routes/questionRoutes");

connectDb();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.get('/', (req, res)=>{
    res.send("ai intrview platform");
});

app.use("/api/questions" , QuestionRoutes);

app.get("/api/questions",QuestionRoutes)

app.get("/api/questions/:id", QuestionRoutes);

app.listen(PORT, ()=>{
    console.log("applications is running on port 5000");
})