//After adding the css

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateResumeQuestions } from "../services/api";

const ResumeQuestions = () => {
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resumeFile) {
      alert("Please upload a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setLoading(true);
      setQuestions([]);

      const response = await generateResumeQuestions(formData);
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Error generating resume questions"
      );
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

          <Link to="/ask-anything">
            <button className="secondary-btn">Ask Anything</button>
          </Link>

          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="app-title">Resume-Based Interview Questions</h1>
        <p className="subtitle">
          Upload your resume PDF and get interview questions tailored to your
          skills, projects, and experience.
        </p>

        <div className="form-group">
          <input
            className="file-input"
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </div>

        <div className="button-row">
          <button className="primary-btn" onClick={handleUpload}>
            {loading ? "Generating..." : "Upload Resume & Generate Questions"}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="output-card">
            <h3>Questions Based on Your Resume</h3>
            <ol className="resume-list">
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeQuestions;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { generateResumeQuestions } from "../services/api";

// const ResumeQuestions = () => {
//   const navigate = useNavigate();

//   const [resumeFile, setResumeFile] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!resumeFile) {
//       alert("Please upload a PDF resume");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     try {
//       setLoading(true);
//       setQuestions([]);

//       const response = await generateResumeQuestions(formData);
//       setQuestions(response.data.questions || []);
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Error generating resume questions");
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

//         <Link to="/ask-anything">
//           <button>Ask Anything</button>
//         </Link>

//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       <h1>Resume-Based Interview Questions</h1>

//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => setResumeFile(e.target.files[0])}
//       />

//       <br />
//       <br />

//       <button onClick={handleUpload}>
//         {loading ? "Generating..." : "Upload Resume & Generate Questions"}
//       </button>

//       <br />
//       <br />

//       {questions.length > 0 && (
//         <div>
//           <h3>Questions Based on Your Resume:</h3>
//           <ol>
//             {questions.map((question, index) => (
//               <li key={index}>{question}</li>
//             ))}
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeQuestions;