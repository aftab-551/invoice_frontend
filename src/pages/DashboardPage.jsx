import { Button } from "@/components/ui/button";
import React from "react";

function DashboardPage({ setIsAuthenticated }) {
    const handleLogout = () => {
        console.log("Simulating logout...");
        setIsAuthenticated(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the protected admin dashboard!</p>
            <p>Content for the dashboard goes here.</p>
            <Button
                onClick={handleLogout}
                variant="destructive"
                className="mt-4"
            >
                Simulate Logout
            </Button>
        </div>
    );
}

export default DashboardPage;
