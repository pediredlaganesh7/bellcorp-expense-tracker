import { useState } from "react";

export default function SearchFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const applyFilters = () => {
    onFilter({
      search,
      category,
      fromDate,
      toDate,
    });
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        background: "#f8fafc",
        borderRadius: "10px",
      }}
    >
      <h3>Search & Filter</h3>

      <input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <button onClick={applyFilters} style={{ marginTop: "10px" }}>
        Apply Filters
      </button>
    </div>
  );
}
