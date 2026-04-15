import React, { useState } from "react";
import { askAnything, logoutUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const AskAnything = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleAsk = async () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setAnswer("");

      const res = await askAnything({ question });
      setAnswer(res.data.answer);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Error getting AI answer"
      );
    } finally {
      setLoading(false);
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
          <Link to="/interview">
            <button className="secondary-btn">Interview Prep</button>
          </Link>
          <Link to="/dashboard">
            <button className="secondary-btn">Dashboard</button>
          </Link>
          <Link to="/resume-questions">
            <button className="secondary-btn">Resume Questions</button>
          </Link>
          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="app-title">Ask Anything</h1>
        <p className="subtitle">
          Ask any backend, frontend, CS fundamentals, or interview-related question and get a short AI answer.
        </p>

        <div className="form-group">
          <textarea
            className="textarea-field"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="button-row">
          <button
            className="primary-btn"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? "Getting Answer..." : "Ask AI"}
          </button>
        </div>

        {answer && (
          <div className="result-card">
            <h3>AI Answer</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAnything;