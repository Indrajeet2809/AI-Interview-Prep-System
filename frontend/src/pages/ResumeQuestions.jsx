import React, { useState } from "react";
import { generateResumeQuestions, logoutUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const ResumeQuestions = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!file) {
      setErrorMessage("Please upload a resume PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setErrorMessage("");
      setQuestions([]);

      const res = await generateResumeQuestions(formData);
      setQuestions(res.data.questions || []);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Error generating resume-based questions"
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
          <Link to="/ask-anything">
            <button className="secondary-btn">Ask Anything</button>
          </Link>
          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="app-title">Resume-Based Interview Questions</h1>
        <p className="subtitle">
          Upload your resume PDF and get interview questions tailored to your skills, projects, and experience.
        </p>

        <div className="form-group">
          <input
            className="input-field"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="button-row">
          <button
            className="primary-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="result-card">
            <h3>Questions Based on Your Resume</h3>
            <ol>
              {questions.map((item, index) => (
                <li key={index}>
                  {typeof item === "string" ? item : item.question}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeQuestions;