import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "Male",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("User already exists or invalid data");
    }
  };

  return (
    <div className="auth-container card">
      <h2>Register</h2>

      {error && <div className="error">{error}</div>}
      {success && (
        <div style={{ color: "#22c55e", marginBottom: "10px" }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          min="1"
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" style={{ width: "100%" }}>
          Register
        </button>
      </form>

      <div className="link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
