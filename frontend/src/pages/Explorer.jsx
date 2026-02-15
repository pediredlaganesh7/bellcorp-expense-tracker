import { useState } from "react";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import SearchFilter from "../components/transactions/SearchFilter";
import Navbar from "../components/layout/Navbar";

export default function Explorer() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    fromDate: "",
    toDate: "",
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Transaction Explorer</h1>

        <SearchFilter onFilter={setFilters} />
        <AddTransactionForm />
        <TransactionList filters={filters} />
      </div>
    </>
  );
}
