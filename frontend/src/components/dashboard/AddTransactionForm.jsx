import { useState } from "react";
import { useTransactions } from "../../context/TransactionContext";

const AddTransactionForm = () => {
  const { addTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    await addTransaction({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });
  };

  return (
    <div className="add-transaction-card">
      <h3>Add Transaction</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title (e.g. Grocery)"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category (Food, Rent, Travel)"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
