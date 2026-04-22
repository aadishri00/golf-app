import { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const nav = useNavigate();

  // 🔐 token inside function (safe)
  const getToken = () => localStorage.getItem("token");

  // 🚪 logout
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  // 📥 get user
  const fetchUser = () => {
    API.get("/user/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }).then(res => setUser(res.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 💳 activate subscription
  const activateSub = async () => {
    try {
      await API.post("/user/subscribe", {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      alert("Subscription Activated");
      fetchUser();

    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
  <div className="container">
    
    {/* 🔹 HEADER ONLY FLEX */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>Dashboard</h2>

      <button
        onClick={logout}
        style={{
          width: "100px",
          background: "#ef4444"
        }}
      >
        Logout
      </button>
    </div>

    <p><b>Name:</b> {user.name}</p>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Winnings:</b> ₹{user.winnings}</p>
    <p><b>Subscription:</b> {user.subscription}</p>

    {/* 💳 subscription */}
    {user.subscription !== "active" && (
      <button onClick={activateSub}>
        Activate Subscription
      </button>
    )}

    <br /><br />

    {/* ➕ add score */}
    <Link to="/add-score">
      <button>Add Score</button>
    </Link>

    <h3>Scores</h3>

    {user.scores.length === 0 && <p>No scores yet</p>}

    {user.scores.map(s => (
      <div key={s._id} style={{
        background: "#eef2ff",
        padding: "8px",
        margin: "5px 0",
        borderRadius: "5px"
      }}>
        {s.value} ({new Date(s.date).toLocaleDateString()})
      </div>
    ))}

  </div>
);
}