//After adding the css

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { askAnything } from "../services/api";

const AskAnything = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) {
      alert("Please enter your question");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const response = await askAnything({ question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Error getting answer");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          Ask any backend, frontend, CS fundamentals, or interview-related
          question and get a short AI answer.
        </p>

        <div className="form-group">
          <textarea
            className="textarea-field"
            placeholder="Ask any technical or interview-related question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="button-row">
          <button
            className="primary-btn"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? "Getting Answer..." : "Ask Question"}
          </button>
        </div>

        {answer && (
          <div className="output-card">
            <h3>Answer</h3>
            <p className="answer-text">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAnything;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { askAnything } from "../services/api";

// const AskAnything = () => {
//   const navigate = useNavigate();

//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAsk = async () => {
//     if (!question) {
//       alert("Please enter your question");
//       return;
//     }

//     try {
//       setLoading(true);
//       setAnswer("");

//       const response = await askAnything({ question });
//       setAnswer(response.data.answer);
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Error getting answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         <Link to="/interview">
//           <button>Interview Prep</button>
//         </Link>

//         <Link to="/dashboard">
//           <button>Dashboard</button>
//         </Link>

//         <Link to="/resume-questions">
//           <button>Resume Questions</button>
//         </Link>

//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       <h1>Ask Anything</h1>

//       <textarea
//         placeholder="Ask any technical or interview-related question..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         rows={5}
//         cols={70}
//       />

//       <br />
//       <br />

//       <button onClick={handleAsk}>
//         {loading ? "Getting Answer..." : "Ask Question"}
//       </button>

//       <br />
//       <br />

//       {answer && (
//         <div>
//           <h3>Answer:</h3>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AskAnything;