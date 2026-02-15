import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/explorer"
              element={
                <ProtectedRoute>
                  <Explorer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
