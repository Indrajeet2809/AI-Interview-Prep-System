// After adding the css 

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      navigate("/interview");
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-card auth-card">
        <h1 className="app-title">Login</h1>
        <p className="subtitle">
          Login to continue your interview preparation journey.
        </p>

        <div className="form-group">
          <input
            className="input-field"
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <div className="button-row">
          <button
            className="primary-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../services/api";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await loginUser(form);

//       localStorage.setItem("token", res.data.token);

//       alert("Login successful");
//       navigate("/interview");
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Login</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <br />
//       <br />

//       <input
//         type="password"
//         placeholder="Enter Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <br />
//       <br />

//       <button onClick={handleLogin}>Login</button>

//       <br />
//       <br />

//       <p>
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;