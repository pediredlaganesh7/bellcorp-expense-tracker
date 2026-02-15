const db = require("../config/db");

/* =========================
   ADD TRANSACTION
========================= */
exports.addTransaction = (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const userId = req.user.id; // ✅ correct

  const query = `
    INSERT INTO transactions (title, amount, category, date, notes, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [title, amount, category, date, notes || null, userId],
    (err) => {
      if (err) {
        console.error("ADD TX ERROR:", err);
        return res.status(500).json({ message: "Failed to add transaction" });
      }

      res.json({ message: "Transaction added" });
    }
  );
};

/* =========================
   GET USER TRANSACTIONS (PAGINATED)
========================= */
exports.getTransactions = (req, res) => {
  const userId = req.user.id; // ✅ correct

  // pagination params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const query = `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [userId, limit, offset], (err, results) => {
    if (err) {
      console.error("GET TX ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch transactions" });
    }

    res.json(results);
  });
};

/* =========================
   UPDATE TRANSACTION
========================= */
exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date, notes } = req.body;
  const userId = req.user.id; // 🔥 FIX HERE

  const query = `
    UPDATE transactions
    SET title=?, amount=?, category=?, date=?, notes=?
    WHERE id=? AND user_id=?
  `;

  db.query(
    query,
    [title, amount, category, date, notes, id, userId],
    (err, result) => {
      if (err || result.affectedRows === 0) {
        return res.status(403).json({ message: "Not authorized" });
      }

      res.json({ message: "Transaction updated" });
    }
  );
};

/* =========================
   DELETE TRANSACTION
========================= */
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // 🔥 FIX HERE

  const query = `
    DELETE FROM transactions
    WHERE id=? AND user_id=?
  `;

  db.query(query, [id, userId], (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ message: "Transaction deleted" });
  });
};
