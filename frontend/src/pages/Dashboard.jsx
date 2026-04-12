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
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Link to="/interview">
          <button>Go to Interview</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Dashboard</h2>

      {loading && <p>Loading dashboard...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <h3>Total Questions: {stats.totalQuestions}</h3>
          <h3>Average Score: {Number(stats.averageScore).toFixed(1)}</h3>

          <h3>Previous Attempts:</h3>

          {attempts.length === 0 ? (
            <p>No attempts found yet.</p>
          ) : (
            attempts.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid gray",
                  margin: "10px 0",
                  padding: "10px",
                }}
              >
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
  );
};

export default Dashboard;