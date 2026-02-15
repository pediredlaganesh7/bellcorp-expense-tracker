import { useTransactions } from "../../context/TransactionContext";

const TransactionList = () => {
  const { transactions, loading, hasMore, fetchTransactions } =
    useTransactions();

  if (!transactions.length && !loading) {
    return <p>No transactions found.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Transactions</h3>

      {transactions.map((tx) => (
        <div
          key={tx.id}
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
              {tx.category} • {new Date(tx.date).toLocaleDateString()}
            </p>
          </div>

          <strong>₹ {tx.amount}</strong>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={() => fetchTransactions()}
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default TransactionList;
