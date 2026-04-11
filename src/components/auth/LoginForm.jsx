import { useState } from "react"; // Added this
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, handleLogin }) {
    // 1. Setup local state for the inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Handle form submission
    const onSubmit = (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        handleLogin({ email, password }); // Sends the data to LoginContainer
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* 3. Attach the onSubmit handler here */}
                    <form onSubmit={onSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email} // Controlled input
                                        onChange={(e) => setEmail(e.target.value)} // Update state
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password} // Controlled input
                                        onChange={(e) => setPassword(e.target.value)} // Update state
                                        required
                                    />
                                </div>
                                <Button 
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#2563eb', // Primary Blue
                                        color: '#ffffff',           // White text
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}