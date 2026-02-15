import Navbar from "../components/layout/Navbar";
import SummaryCards from "../components/dashboard/SummaryCards";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import { useTransactions } from "../context/TransactionContext"; // 🔥 FIX

export default function Dashboard() {
  const { transactions, loading } = useTransactions();

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Dashboard</h1>

        {loading && <p>Loading transactions...</p>}

        <SummaryCards transactions={transactions} />
        <CategoryBreakdown transactions={transactions} />

        <AddTransactionForm />
        <TransactionList />
      </div>
    </>
  );
}
