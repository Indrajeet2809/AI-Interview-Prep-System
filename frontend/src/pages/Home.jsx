//After adding the css 

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

// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>AI Interview Prep System</h1>
//       <p>Please register or login before starting your interview preparation.</p>

//       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//         <Link to="/register">
//           <button>Register</button>
//         </Link>

//         <Link to="/login">
//           <button>Login</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;