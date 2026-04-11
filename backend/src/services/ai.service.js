const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Use 'gemini-2.5-flash' for production stability.
 * If you specifically want Gemini 3 features, use 'gemini-3-flash-preview'.
 */
const MODEL_NAME = "gemini-2.5-flash"; 

const textModel = genAI.getGenerativeModel({
  model: MODEL_NAME,
});

const jsonModel = genAI.getGenerativeModel({
  model: MODEL_NAME,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// Generate Question
const generateAIQuestion = async (prompt) => {
  try {
    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    // Better error logging for 404/Quota issues
    console.error("Gemini Error Details:", error.status, error.message);
    throw error;
  }
};

//  Evaluate Answer
const evaluateAnswerAI = async (prompt) => {
  try {
    const result = await jsonModel.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Eval Error:", error.message);
    throw error;
  }
};

module.exports = {
  generateAIQuestion,
  evaluateAnswerAI,
};




// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Select model
// const model = genAI.getGenerativeModel({
//   model: "gemini-pro"
// });

// // Generate Question
// const generateAIQuestion = async (prompt) => {
//   const result = await model.generateContent(prompt);
//   return result.response.text().trim();
// };

// // Evaluate Answer
// const evaluateAnswerAI = async (prompt) => {
//   const result = await model.generateContent(prompt);
//   return result.response.text().trim();
// };

// module.exports = {
//   generateAIQuestion,
//   evaluateAnswerAI
// };