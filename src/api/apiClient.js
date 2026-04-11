const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    
    // ONLY redirect if it's NOT the login endpoint
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return; 
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "API Error");
    return data;
};