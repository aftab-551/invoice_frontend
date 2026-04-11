import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To move to the dashboard
import { LoginForm } from "@/components/auth/LoginForm";
import { loginUser } from "@/api/authService"; // The clean API call we built
import { useAuth } from "@/context/AuthContext"; // The global state

const LoginContainer = () => {
    const { login } = useAuth(); // Pull the login function from context
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async (credentials) => {
        setLoading(true);
        setError("");

        try {
            // 1. Call the backend API
            const data = await loginUser(credentials);
            
            // 2. data should contain { token }. Save it globally.
            if (data.token) {
                login(data.token); // This updates AuthContext and localStorage
                
                // 3. Redirect to the protected area
                navigate("/customers");
            }
        } catch (err) {
            // This catches "Invalid Credentials" or Server errors
            setError(err.message || "Something went wrong. Please try again.");
            console.error("Login Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Show error message if login fails */}
            {error && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md text-center">
                    {error}
                </div>
            )}
            
            <LoginForm handleLogin={handleLogin} />

            {loading && (
                <p className="text-center text-xs text-muted-foreground mt-4">
                    Verifying credentials...
                </p>
            )}
        </div>
    );
};

export default LoginContainer;