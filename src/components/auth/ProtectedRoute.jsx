import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

const ProtectedRoute = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Wrap the Outlet (the specific page) inside the Dashboard Layout
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default ProtectedRoute;