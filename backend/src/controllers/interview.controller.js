const { generateQuestionPrompt, evaluateAnswerPrompt } = require("../utils/promptTemplates");
const { generateAIQuestion, evaluateAnswerAI } = require("../services/ai.service");

const Question = require("../models/question.model");
const Answer = require("../models/answer.model");


// Generate Question
const generateQuestion = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        message: "Role and difficulty are required"
      });
    }

    const prompt = generateQuestionPrompt(role, difficulty);

    const questionText = await generateAIQuestion(prompt);

    // Save to DB
    const savedQuestion = await Question.create({
      role,
      difficulty,
      questionText
    });

    res.status(200).json({
      success: true,
      question: savedQuestion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error generating question"
    });
  }
};


// Submit Answer + AI Evaluation 
const submitAnswer = async (req, res) => {
  try {
    const { questionId, answerText } = req.body;

    if (!questionId || !answerText) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 🔥 Get question from DB
    const questionData = await Question.findById(questionId);

    if (!questionData) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    //  Create evaluation prompt
    const prompt = evaluateAnswerPrompt(
      questionData.questionText,
      answerText
    );

    // Call Gemini AI
    const aiResponse = await evaluateAnswerAI(prompt);

    // Clean Gemini response (VERY IMPORTANT)
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", cleaned);
      return res.status(500).json({
        message: "AI response parsing failed"
      });
    }

    // Save answer with evaluation
    const answer = await Answer.create({
      questionId,
      answerText,
      score: parsedResponse.score,
      feedback: parsedResponse.feedback
    });

    res.status(201).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error evaluating answer"
    });
  }
};


//Logics for all get all attempts
const getAllAttempts = async (req, res) => {
  try {
    const answers = await Answer.find()
      .populate("questionId") // join question
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: answers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching attempts"
    });
  }
};


//Logics for all stats of user like his score ,attempts questions
const getStats = async (req, res) => {
  try {
    const answers = await Answer.find();

    const totalQuestions = answers.length;

    const totalScore = answers.reduce((acc, curr) => {
      return acc + (curr.score || 0);
    }, 0);

    const averageScore =
      totalQuestions === 0 ? 0 : totalScore / totalQuestions;

    res.status(200).json({
      success: true,
      totalQuestions,
      averageScore
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching stats"
    });
  }
};

module.exports = {
  generateQuestion,
  submitAnswer,
  getAllAttempts,
  getStats
};