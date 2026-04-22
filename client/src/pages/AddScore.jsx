import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddScore() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const nav = useNavigate();

  const addScore = async () => {
    const token = localStorage.getItem("token");

    try {
      await API.post(
        "/user/score",
        { value, date },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Score added");

      // 🔥 redirect to dashboard
      nav("/dashboard");

    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="container">
      <h2>Add Score</h2>

      <input
        placeholder="Score"
        onChange={(e) => setValue(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={addScore}>Add</button>
    </div>
  );
}