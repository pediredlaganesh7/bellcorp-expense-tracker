const TransactionItem = ({ tx }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        background: "#f8fafc",
        borderRadius: "8px",
        marginBottom: "10px",
        maxWidth: "500px",
      }}
    >
      <div>
        <strong>{tx.title}</strong>
        <p style={{ margin: 0, fontSize: "14px" }}>
          {tx.category} • {new Date(tx.date).toLocaleDateString("en-IN")}
        </p>
      </div>

      <div style={{ textAlign: "right" }}>
        <strong>₹ {tx.amount}</strong>
      </div>
    </div>
  );
};

export default TransactionItem;
