import LoginContainer from "@/containers/LoginContainer";
import AuthLayout from "@/layouts/AuthLayout";
import React from "react";

function LoginPage() {
    return (
        <AuthLayout>
            <LoginContainer />
        </AuthLayout>
    );
}

export default LoginPage;
