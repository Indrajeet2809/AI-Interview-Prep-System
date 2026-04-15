import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-wrapper">
      <div className="main-card" style={{ maxWidth: "700px", textAlign: "center" }}>
        <h1 className="app-title">AI Interview Prep System</h1>
        <p className="subtitle">
          Practice interview questions, evaluate your answers, ask technical
          doubts, and generate personalized questions from your resume.
        </p>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link to="/register">
            <button className="primary-btn">Register</button>
          </Link>

          <Link to="/login">
            <button className="secondary-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;