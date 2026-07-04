require("dotenv").config();

const express =require('express');
const cors=require('cors');
const app=express();
const connectDb=require("./config/db");

const authRoutes=require("./routes/authRoutes");
const QuestionRoutes=require("./routes/questionRoutes");
const InterviewRoutes=require("./routes/interviewRoutes");
const ansewerRoutes=require("./routes/answerRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const adminRoutes=require("./routes/adminRoutes");

connectDb();

const allowedOrigins = [
    "http://localhost:5173",
    "https://talent-forge-ai-ai-interview-platfo.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.get('/', (req, res)=>{
    res.send("ai intrview platform");
});

app.use("/api/questions" , QuestionRoutes);

// app.get("/api/questions",QuestionRoutes)

// app.get("/api/questions/:id", QuestionRoutes);

// app.post("/api/questions/:id", QuestionRoutes);

// app.delete("/api/questions/:id", QuestionRoutes);

app.use("/api/interviews", InterviewRoutes);

// app.get("/api/interviews", InterviewRoutes);

app.use("/api/answers", ansewerRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin", adminRoutes);

 
const {
    evaluateAnswerWithAI
} = require("./services/aiService");

app.get("/test-ai", async(req,res)=>{

    const result =
        await evaluateAnswerWithAI(
            "What is HashMap?",
            "HashMap stores key value pairs."
        );

    res.send(result);
});

app.listen(PORT, ()=>{
    console.log("applications is running on port 5000");
})