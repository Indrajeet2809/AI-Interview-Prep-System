import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import AskAnything from "./pages/Askanything";
import ResumeQuestions from "./pages/ResumeQuestions";
import ProtectedRoute from "./components/ProtectedRoutes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ask-anything"
          element={
            <ProtectedRoute>
              <AskAnything />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-questions"
          element={
            <ProtectedRoute>
              <ResumeQuestions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Interview from "./pages/Interview";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/interview"
//           element={
//             <ProtectedRoute>
//               <Interview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;