const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Primary model
const PRIMARY_MODEL = "gemini-2.5-flash";

// Fallback model
const FALLBACK_MODEL = "gemini-2.0-flash";

// Primary models
const textModel = genAI.getGenerativeModel({
  model: PRIMARY_MODEL,
});

const jsonModel = genAI.getGenerativeModel({
  model: PRIMARY_MODEL,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// Fallback models
const fallbackTextModel = genAI.getGenerativeModel({
  model: FALLBACK_MODEL,
});

const fallbackJsonModel = genAI.getGenerativeModel({
  model: FALLBACK_MODEL,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (model, prompt, retries = 1, delay = 1000) => {
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

      // Retry only for temporary server issues
      if ((status === 503 || status === 500) && attempt < retries) {
        await wait(delay * attempt);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
};

// Generic helper: try primary first, then fallback for 429/503/500
const generateWithFallback = async ({
  primaryModel,
  fallbackModel,
  prompt,
  retries = 1,
  delay = 1000,
  featureName = "AI",
}) => {
  try {
    return await generateWithRetry(primaryModel, prompt, retries, delay);
  } catch (error) {
    const status = error?.status;

    console.error(`${featureName} Primary Model Error:`, status, error?.message);

    // Use fallback model only for recoverable provider-side issues
    if (status === 429 || status === 503 || status === 500) {
      try {
        console.log(`${featureName}: Switching to fallback model -> ${FALLBACK_MODEL}`);
        return await generateWithRetry(fallbackModel, prompt, 1, 1000);
      } catch (fallbackError) {
        console.error(
          `${featureName} Fallback Model Error:`,
          fallbackError?.status,
          fallbackError?.message
        );
        throw fallbackError;
      }
    }

    throw error;
  }
};

// Generate Question
const generateAIQuestion = async (prompt) => {
  try {
    return await generateWithFallback({
      primaryModel: textModel,
      fallbackModel: fallbackTextModel,
      prompt,
      retries: 1,
      delay: 1000,
      featureName: "Generate Question",
    });
  } catch (error) {
    console.error("Gemini Question Error:", error?.status, error?.message);
    throw error;
  }
};

// Evaluate Answer
const evaluateAnswerAI = async (prompt) => {
  try {
    return await generateWithFallback({
      primaryModel: jsonModel,
      fallbackModel: fallbackJsonModel,
      prompt,
      retries: 2,
      delay: 1500,
      featureName: "Evaluate Answer",
    });
  } catch (error) {
    console.error("Gemini Eval Error:", error?.status, error?.message);
    throw error;
  }
};

// Ask Anything
const askAnythingAI = async (prompt) => {
  try {
    return await generateWithFallback({
      primaryModel: textModel,
      fallbackModel: fallbackTextModel,
      prompt,
      retries: 1,
      delay: 1000,
      featureName: "Ask Anything",
    });
  } catch (error) {
    console.error("Gemini Ask Anything Error:", error?.status, error?.message);
    throw error;
  }
};

// Resume Questions
const generateResumeQuestionsAI = async (prompt) => {
  try {
    return await generateWithFallback({
      primaryModel: jsonModel,
      fallbackModel: fallbackJsonModel,
      prompt,
      retries: 1,
      delay: 1000,
      featureName: "Resume Questions",
    });
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

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const generateWithRetry = async (model, prompt, retries = 3, delay = 2000) => {
//   let lastError;

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return response.text().trim();
//     } catch (error) {
//       lastError = error;
//       const status = error?.status;

//       console.error(`Gemini attempt ${attempt} failed:`, status, error.message);

//       if ((status === 503 || status === 429 || status === 500) && attempt < retries) {
//         await wait(delay * attempt);
//         continue;
//       }

//       throw error;
//     }
//   }

//   throw lastError;
// };

// // Generate Question
// const generateAIQuestion = async (prompt) => {
//   try {
//     return await generateWithRetry(textModel, prompt, 1, 1000);
//   } catch (error) {
//     console.error("Gemini Question Error:", error?.status, error?.message);
//     throw error;
//   }
// };

// // Evaluate Answer
// const evaluateAnswerAI = async (prompt) => {
//   try {
//     return await generateWithRetry(jsonModel, prompt, 2, 1500);
//   } catch (error) {
//     console.error("Gemini Eval Error:", error?.status, error?.message);
//     throw error;
//   }
// };

// // Ask Anything
// const askAnythingAI = async (prompt) => {
//   try {
//     return await generateWithRetry(textModel, prompt, 1, 1000);
//   } catch (error) {
//     console.error("Gemini Ask Anything Error:", error?.status, error?.message);
//     throw error;
//   }
// };

// // Resume Questions
// const generateResumeQuestionsAI = async (prompt) => {
//   try {
//     return await generateWithRetry(jsonModel, prompt, 2, 1500);
//   } catch (error) {
//     console.error("Gemini Resume Questions Error:", error?.status, error?.message);
//     throw error;
//   }
// };

// module.exports = {
//   generateAIQuestion,
//   evaluateAnswerAI,
//   askAnythingAI,
//   generateResumeQuestionsAI,
// };








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


