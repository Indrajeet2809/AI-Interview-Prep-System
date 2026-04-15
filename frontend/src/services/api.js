import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Auth
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};

// Admin
export const getUsers = () => {
  return API.get("/auth/users");
};

export const deleteUser = (userId) => {
  return API.delete(`/auth/delete/${userId}`);
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