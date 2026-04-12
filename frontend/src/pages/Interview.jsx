import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateQuestion, submitAnswer } from "../services/api";

const Interview = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate Question
  const handleGenerate = async () => {
    if (!role || !difficulty) {
      alert("Please enter role and difficulty");
      return;
    }

    try {
      setLoading(true);

      const response = await generateQuestion({
        role,
        difficulty,
      });

      console.log(response.data);

      setQuestion(response.data.question.questionText);
      setQuestionId(response.data.question._id);

      // Reset previous answer/result
      setAnswer("");
      setFeedback("");
      setScore(null);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Error generating question");
    } finally {
      setLoading(false);
    }
  };

  // Submit Answer
  const handleSubmit = async () => {
    if (!answer) {
      alert("Please write an answer");
      return;
    }

    if (!questionId) {
      alert("Question not found. Please generate a question again.");
      return;
    }

    try {
      setLoading(true);

      const response = await submitAnswer({
        questionId,
        answerText: answer,
      });

      console.log(response.data);

      setFeedback(response.data.answer.feedback);
      setScore(response.data.answer.score);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Error evaluating answer");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Link to="/dashboard">
          <button>Go to Dashboard</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <h1>AI Interview Prep</h1>

      <input
        type="text"
        placeholder="Enter Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Question"}
      </button>

      <br />
      <br />

      {question && (
        <div>
          <h3>Generated Question:</h3>
          <p>{question}</p>

          <textarea
            placeholder="Write your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            cols={50}
          />

          <br />
          <br />

          <button onClick={handleSubmit}>
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        </div>
      )}

      <br />

      {feedback && (
        <div>
          <h3>Score: {score}/10</h3>
          <p>
            <strong>Feedback:</strong> {feedback}
          </p>
        </div>
      )}
    </div>
  );
};

export default Interview;