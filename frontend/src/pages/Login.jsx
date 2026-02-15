import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// ✅ DEFINE STYLES FIRST
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
};

const card = {
  width: "320px",
  padding: "25px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // 🔥 CRITICAL
      login(res.data.token);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={button} type="submit">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center" }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
