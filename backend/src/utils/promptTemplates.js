const generateQuestionPrompt = (role, difficulty) => {
  return `
You are an expert interviewer.

Generate ONE ${difficulty} level interview question for a ${role} role.

Rules:
- Return ONLY the question
- Do NOT include explanations
- Do NOT include phrases like "You are building"
- Keep it concise
`;
};

const evaluateAnswerPrompt = (question, answer) => {
  return `
    You are an expert interviewer.

    Question:
    ${question}

    Candidate Answer:
    ${answer}

    Evaluate the answer and respond in JSON format:
    {
      "score": number (0-10),
      "feedback": "detailed feedback",
      "improvement": "how to improve"
    }
  `;
};

module.exports =  {generateQuestionPrompt, evaluateAnswerPrompt};