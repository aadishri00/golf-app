import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      console.log(res.data);
      alert("Registered Successfully");

      nav("/"); // login page pe bhej do

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message || "Error");
console.log(err.response);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}