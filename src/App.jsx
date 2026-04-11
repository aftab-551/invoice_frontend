import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CustomerPage from "./pages/CustomerPage";
import ProductPage from "./pages/ProductPage";
import SchedulePage from "./pages/SchedulePage";
import TransactionPage from "./pages/TransactionPage";
import NotificationPage from "./pages/NotificationPage";
import InvoicePage from "./pages/InvoicePage";

function AppContent() {
    const { isAuthenticated } = useAuth();

return (
        <Routes>
            {/* Public Route: Login */}
            <Route
                path="/login"
                element={
                    !isAuthenticated ? (
                        <LoginPage />
                    ) : (
                        <Navigate to="/customers" replace />
                    )
                }
            />
            {/* Protected Routes */}
            {/* Use the ProtectedRoute component as the element for a layout route */}
            {/* All nested routes will be rendered inside DashboardLayout's <Outlet /> */}
            <Route
                element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
                <Route path="/customers" element={<CustomerPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/schedules" element={<SchedulePage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/invoices" element={<InvoicePage />} />
            </Route>

            {/* If user is logged in, go to dashboard, otherwise go to login */}
            <Route
                path="/"
                element={
                    <Navigate
                        to={isAuthenticated ? "/customers" : "/login"}
                        replace
                    />
                }
            />

            {/* Optional: Catch-all 404 Not Found Route */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}
// Main App component just provides the Context
function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
