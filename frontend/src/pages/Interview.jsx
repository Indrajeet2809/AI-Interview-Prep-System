import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateQuestion, submitAnswer, logoutUser } from "../services/api";

const Interview = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [questionLoading, setQuestionLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  const handleGenerate = async () => {
    if (!role.trim() || !difficulty.trim()) {
      setErrorMessage("Please enter role and difficulty.");
      return;
    }

    try {
      setQuestionLoading(true);
      setErrorMessage("");

      const response = await generateQuestion({
        role: role.trim(),
        difficulty: difficulty.trim(),
      });

      setQuestion(response.data.question.questionText);
      setQuestionId(response.data.question._id);
      setAnswer("");
      setFeedback("");
      setScore(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Error generating question"
      );
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setErrorMessage("Please write an answer.");
      return;
    }

    if (!questionId) {
      setErrorMessage("Question not found. Please generate a question again.");
      return;
    }

    try {
      setAnswerLoading(true);
      setErrorMessage("");

      const response = await submitAnswer({
        questionId,
        answerText: answer.trim(),
      });

      setFeedback(response.data.answer.feedback);
      setScore(response.data.answer.score);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Error evaluating answer"
      );
    } finally {
      setAnswerLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("Logout failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-card">
        <div className="top-nav">
          <Link to="/dashboard">
            <button className="secondary-btn">Dashboard</button>
          </Link>

          <Link to="/ask-anything">
            <button className="secondary-btn">Ask Anything</button>
          </Link>

          <Link to="/resume-questions">
            <button className="secondary-btn">Resume Questions</button>
          </Link>

          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="app-title">AI Interview Prep</h1>
        <p className="subtitle">
          Generate interview questions, submit your answers, and get AI-powered
          evaluation instantly.
        </p>

        <div className="form-group">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="button-row">
          <button
            className="primary-btn"
            onClick={handleGenerate}
            disabled={questionLoading || answerLoading}
          >
            {questionLoading ? "Generating..." : "Generate Question"}
          </button>
        </div>

        {question && (
          <div className="output-card">
            <h3>Generated Question</h3>
            <p className="question-text">{question}</p>

            <textarea
              className="textarea-field"
              placeholder="Write your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <div className="button-row">
              <button
                className="primary-btn"
                onClick={handleSubmit}
                disabled={answerLoading || questionLoading}
              >
                {answerLoading ? "Evaluating..." : "Submit Answer"}
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div className="result-card">
            <h3>Evaluation Result</h3>
            <p>
              <strong>Score:</strong> {score}/10
            </p>
            <p>
              <strong>Feedback:</strong> {feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;