const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateInterviewWithAI = async (questionsAndAnswers) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    let prompt = `
You are an expert software engineering interviewer.

Evaluate the following interview.

Score each answer from 0 to 10.

Provide constructive feedback.

Return ONLY valid JSON.

`;

    questionsAndAnswers.forEach((item, index) => {

        prompt += `
Question ${index + 1}

Title:
${item.title}

Description:
${item.description}

Candidate Answer:
${item.answer}

------------------------

`;

    });

    prompt += `
Return ONLY this JSON format.

{
  "answers":[
    {
      "questionIndex":0,
      "score":8,
      "feedback":"Good explanation."
    }
  ],
  "overallScore":8,
  "overallFeedback":"Overall good interview performance."
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedText);

};

module.exports = {
    evaluateInterviewWithAI
};