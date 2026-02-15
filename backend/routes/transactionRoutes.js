const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// 🔐 All routes are protected (JWT required)

// Add new transaction
router.post("/", authMiddleware, addTransaction);

// Get all transactions for logged-in user
router.get("/", authMiddleware, getTransactions);

// Update transaction by id
router.put("/:id", authMiddleware, updateTransaction);

// Delete transaction by id
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
