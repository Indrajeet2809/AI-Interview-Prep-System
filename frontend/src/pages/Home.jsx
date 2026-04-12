import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Interview Prep System</h1>
      <p>Please register or login before starting your interview preparation.</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Link to="/register">
          <button>Register</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;