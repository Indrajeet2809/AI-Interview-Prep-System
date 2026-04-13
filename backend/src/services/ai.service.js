const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (model, prompt, retries = 3, delay = 2000) => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      lastError = error;
      const status = error?.status;

      console.error(`Gemini attempt ${attempt} failed:`, status, error.message);

      if ((status === 503 || status === 429 || status === 500) && attempt < retries) {
        await wait(delay * attempt);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
};

// Generate Question
const generateAIQuestion = async (prompt) => {
  try {
    return await generateWithRetry(textModel, prompt, 1, 1000);
  } catch (error) {
    console.error("Gemini Question Error:", error?.status, error?.message);
    throw error;
  }
};

// Evaluate Answer
const evaluateAnswerAI = async (prompt) => {
  try {
    return await generateWithRetry(jsonModel, prompt, 2, 1500);
  } catch (error) {
    console.error("Gemini Eval Error:", error?.status, error?.message);
    throw error;
  }
};

// Ask Anything
const askAnythingAI = async (prompt) => {
  try {
    return await generateWithRetry(textModel, prompt, 1, 1000);
  } catch (error) {
    console.error("Gemini Ask Anything Error:", error?.status, error?.message);
    throw error;
  }
};

// Resume Questions
const generateResumeQuestionsAI = async (prompt) => {
  try {
    return await generateWithRetry(jsonModel, prompt, 2, 1500);
  } catch (error) {
    console.error("Gemini Resume Questions Error:", error?.status, error?.message);
    throw error;
  }
};

module.exports = {
  generateAIQuestion,
  evaluateAnswerAI,
  askAnythingAI,
  generateResumeQuestionsAI,
};








// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize with API Key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Use 'gemini-2.5-flash' for production stability.
//  * If you specifically want Gemini 3 features, use 'gemini-3-flash-preview'.
//  */
// const MODEL_NAME = "gemini-2.5-flash"; 

// const textModel = genAI.getGenerativeModel({
//   model: MODEL_NAME,
// });

// const jsonModel = genAI.getGenerativeModel({
//   model: MODEL_NAME,
//   generationConfig: {
//     responseMimeType: "application/json",
//   },
// });

// // Generate Question
// const generateAIQuestion = async (prompt) => {
//   try {
//     const result = await textModel.generateContent(prompt);
//     const response = await result.response;
//     return response.text().trim();
//   } catch (error) {
//     // Better error logging for 404/Quota issues
//     console.error("Gemini Error Details:", error.status, error.message);
//     throw error;
//   }
// };

// //  Evaluate Answer
// const evaluateAnswerAI = async (prompt) => {
//   try {
//     const result = await jsonModel.generateContent(prompt);
//     const response = await result.response;
//     return response.text().trim();
//   } catch (error) {
//     console.error("Gemini Eval Error:", error.message);
//     throw error;
//   }
// };

// module.exports = {
//   generateAIQuestion,
//   evaluateAnswerAI,
// };


