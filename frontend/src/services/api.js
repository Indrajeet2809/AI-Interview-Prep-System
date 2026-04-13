import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Interview Prep
export const generateQuestion = (data) => {
  return API.post("/interview/generate-question", data);
};

export const submitAnswer = (data) => {
  return API.post("/interview/submit-answer", data);
};

// Dashboard
export const getAllAttempts = () => {
  return API.get("/interview/attempts");
};

export const getStats = () => {
  return API.get("/interview/stats");
};

// Ask Anything
export const askAnything = (data) => {
  return API.post("/interview/ask-anything", data);
};

// Resume Questions
export const generateResumeQuestions = (formData) => {
  return API.post("/interview/resume-questions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000/api",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Auth
// export const registerUser = (data) => {
//   return API.post("/auth/register", data);
// };

// export const loginUser = (data) => {
//   return API.post("/auth/login", data);
// };

// // Interview
// export const generateQuestion = (data) => {
//   return API.post("/interview/generate-question", data);
// };

// export const submitAnswer = (data) => {
//   return API.post("/interview/submit-answer", data);
// };

// // Dashboard
// export const getAllAttempts = () => {
//   return API.get("/interview/attempts");
// };

// export const getStats = () => {
//   return API.get("/interview/stats");
// };

// export default API;