const generateQuestionPrompt = (role, difficulty) => {
  return `
  You are a technical interviewer.

Generate ONE ${difficulty} level interview question for a ${role} role.

IMPORTANT RULES:
- Question must be SHORT (1-2 lines max)
- Do NOT include explanations
- Do NOT include phrases like "You are building"
- Ask only ONE clear question
- Avoid long scenario-based questions
- Keep it realistic and commonly asked in interviews

Difficulty Guidelines:
- Basic: fundamental concepts
- Intermediate: practical understanding
- Advanced: system design or deep concepts

Return ONLY the question text.
`;
};

const evaluateAnswerPrompt = (question, answer) => {
  return `
You are an expert technical interviewer.

Evaluate the candidate's answer based on clarity, correctness, and relevance.

IMPORTANT RULES:
- Do NOT penalize the answer only for being short.
- Give a fair score even if the answer is concise but correct.
- Prefer clarity and correctness over length.
- Feedback should be short and to the point (2-3 lines max).
- Suggest simple and practical improvements.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this format:

{
  "score": number (0-10),
  "feedback": "short feedback (2-3 lines)",
  "improvement": "1-2 simple suggestions to improve"
}
`;
};


const askAnythingPrompt = (question) => {
  return `
You are a helpful technical interview assistant.

Answer the user's question in a short, clear, and beginner-friendly way.

Rules:
- Keep the answer between 4 to 6 lines only.
- Use simple language.
- Do not give very long explanations.
- Do not use markdown symbols like **, ###, or bullets unless necessary.
- Give only the direct answer.
- If the topic is technical, explain it in a concise way with at most one small example.

User Question:
${question}
`;
};


const resumeQuestionsPrompt = (resumeText) => {
  return `
You are an AI interview preparation assistant.

Analyze the resume below and generate interview questions based only on the candidate's skills, projects, tools, technologies, and work experience mentioned in the resume.

IMPORTANT INSTRUCTIONS:
- Generate exactly 8 interview questions.
- Mix the questions in this order:
  - First 3 should be basic
  - Next 3 should be intermediate
  - Last 2 should be advanced
- Questions must be short, clear, and direct.
- Each question should contain only one idea.
- Avoid long paragraph-style questions.
- Avoid duplicate questions.
- Keep them realistic and suitable for interview practice.

Resume:
${resumeText}

Return the output strictly in this JSON format:

{
  "questions": [
    "Basic: Question 1",
    "Basic: Question 2",
    "Basic: Question 3",
    "Intermediate: Question 4",
    "Intermediate: Question 5",
    "Intermediate: Question 6",
    "Advanced: Question 7",
    "Advanced: Question 8"
  ]
}
`;
};

module.exports =  { 
  generateQuestionPrompt,
  evaluateAnswerPrompt,
  askAnythingPrompt,
  resumeQuestionsPrompt};