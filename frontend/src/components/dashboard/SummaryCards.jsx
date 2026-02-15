import { useEffect, useState } from "react";

const SummaryCards = ({ transactions }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const total = transactions.reduce(
      (sum, tx) => sum + Number(tx.amount),
      0
    );
    setTotalExpenses(total);
  }, [transactions]); // 🔥 recompute when data arrives

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <div style={cardStyle}>
        <h4>Total Expenses</h4>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          ₹ {totalExpenses}
        </p>
      </div>

      <div style={cardStyle}>
        <h4>Total Transactions</h4>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {transactions.length}
        </p>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#eef2ff",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "200px",
};

export default SummaryCards;
