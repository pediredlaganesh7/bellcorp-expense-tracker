import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const TransactionContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const TransactionProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 5;

  const fetchTransactions = async (reset = false) => {
    if (!token || !hasMore && !reset) return;

    try {
      setLoading(true);

      const currentPage = reset ? 1 : page;

      const res = await api.get(
        `/transactions?page=${currentPage}&limit=${LIMIT}`
      );

      if (reset) {
        setTransactions(res.data);
      } else {
        setTransactions((prev) => [...prev, ...res.data]);
      }

      setHasMore(res.data.length === LIMIT);
      setPage(currentPage + 1);
    } catch (err) {
      console.error("Fetch transactions failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch immediately after login
  useEffect(() => {
    if (token) {
      setTransactions([]);
      setPage(1);
      setHasMore(true);
      fetchTransactions(true);
    } else {
      setTransactions([]);
    }
  }, [token]);

  const addTransaction = async (data) => {
    await api.post("/transactions", data);
    setPage(1);
    setHasMore(true);
    fetchTransactions(true);
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    setPage(1);
    setHasMore(true);
    fetchTransactions(true);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        hasMore,
        fetchTransactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
