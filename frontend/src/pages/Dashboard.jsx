import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAttempts, getStats } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState([]);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const attemptsRes = await getAllAttempts();
      const statsRes = await getStats();

      setAttempts(attemptsRes.data.data || []);
      setStats({
        totalQuestions: statsRes.data.totalQuestions || 0,
        averageScore: statsRes.data.averageScore || 0,
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="main-card">
        <div className="top-nav">
          <Link to="/interview">
            <button className="secondary-btn">Interview</button>
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

        <h1 className="app-title">Dashboard</h1>
        <p className="subtitle">
          Review your overall interview performance and previous attempts.
        </p>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="stats-box">
              <div className="stat-item">
                <h4>Total Questions</h4>
                <p>{stats.totalQuestions}</p>
              </div>

              <div className="stat-item">
                <h4>Average Score</h4>
                <p>{Number(stats.averageScore).toFixed(1)}</p>
              </div>
            </div>

            <h2 className="section-title">Previous Attempts</h2>

            {attempts.length === 0 ? (
              <p>No attempts found yet.</p>
            ) : (
              attempts.map((item) => (
                <div key={item._id} className="attempt-card">
                  <p>
                    <strong>Question:</strong>{" "}
                    {item?.questionId?.questionText || "Question not available"}
                  </p>

                  <p>
                    <strong>Your Answer:</strong> {item.answerText}
                  </p>

                  <p>
                    <strong>Score:</strong> {item.score}/10
                  </p>

                  <p>
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;