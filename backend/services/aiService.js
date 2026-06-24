const { GoogleGenerativeAI }=require("@google/generative-ai");
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateAnswerWithAI=async (question , answer)=>{
   const model=genAI.getGenerativeModel({model: "gemini-2.5-flash"});

   const prompt = `You are a technical interviewer . Question ${question} CandidateAnswer ${answer} 
                    Evaluate the answer and return only valid JSON.
                    {
                    "score":0-10,
                    "feedback":"short feedbackk
                    }`;

    const result= await model.generateContent(prompt);
    
    const response= await result.response;

    const text=response.text();
    const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse(cleanedText);

}

module.exports={evaluateAnswerWithAI};