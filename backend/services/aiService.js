const { GoogleGenerativeAI }=require("@google/generative-ai");
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateAnswerWithAI=async (question , answer)=>{
   const model=genAI.getGenerativeModel({model: "gemini-2.5-flash"});

//    const prompt = `You are a technical interviewer . Question ${question} CandidateAnswer ${answer} 
//                     Evaluate the answer and return only valid JSON.
//                     {
//                     "score":0-10,
//                     "feedback":"short feedbackk
//                     }`;

      const prompt =`You are an expert technical interviewer.

Evaluate each answer.

Return ONLY JSON.

Questions

1.

Question:
Two Sum

Answer:
I will solve it using two pointers.

----------------

2.

Question:
Best Time to Buy Stock

Answer:
Track lowest price...

----------------

3.

Question:
Product Except Self

Answer:
Use prefix and suffix...

Return

{
 "answers":[
   {
      "questionId":"",
      "score":8,
      "feedback":"..."
   }
 ],
 "overallFeedback":"..."
}`

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