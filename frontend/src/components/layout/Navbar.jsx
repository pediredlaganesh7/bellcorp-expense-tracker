import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Bellcorp</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/explorer">Explorer</Link>

        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
