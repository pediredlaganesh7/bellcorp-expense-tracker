export default function CategoryBreakdown({ transactions }) {
  if (!transactions.length) {
    return (
      <div style={{ marginTop: "30px" }}>
        <h3>Category Breakdown</h3>
        <p>No category data yet.</p>
      </div>
    );
  }

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Category Breakdown</h3>

      {Object.entries(categoryTotals).map(([category, total]) => (
        <div
          key={category}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            background: "#f1f5f9",
            borderRadius: "8px",
            marginBottom: "10px",
            maxWidth: "300px",
          }}
        >
          <span>{category}</span>
          <strong>₹ {total}</strong>
        </div>
      ))}
    </div>
  );
}
