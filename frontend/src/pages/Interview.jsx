import { useState } from "react";
import API from "../services/api";

const Interview = () => {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await API.post("/interview/generate-question", {
        role,
        difficulty
      });

      setQuestion(res.data.question.questionText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Interview Prep</h2>

      <input
        type="text"
        placeholder="Enter role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate Question</button>

      {question && (
        <div>
          <h3>Question:</h3>
          <p>{question}</p>
        </div>
      )}
    </div>
  );
};

export default Interview;