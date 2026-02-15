const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER
========================= */
async function register(req, res) {
  try {
    let { email, password, mobile, age, gender } = req.body;

    // ✅ Normalize inputs
    email = email?.trim();
    password = password?.trim();
    mobile = mobile?.trim();
    gender = gender?.trim();

    if (!email || !password || !mobile || !age || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (email, password, mobile, age, gender) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sql,
      [email, hashedPassword, mobile, age, gender],
      (err) => {
        if (err) {
          console.error("REGISTER ERROR:", err);

          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
          }

          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("REGISTER CATCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* =========================
   LOGIN
========================= */
function login(req, res) {
  try {
    let { email, password } = req.body;

    // ✅ Normalize inputs
    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("LOGIN DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // ✅ Compare password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // ✅ Generate JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1d" }
      );

      res.json({ token });
    });
  } catch (error) {
    console.error("LOGIN CATCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* =========================
   EXPORTS
========================= */
module.exports = {
  register,
  login,
};
