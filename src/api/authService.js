import { apiRequest } from "./apiClient";

// export const fetchCustomers = () => apiRequest("/customers"); // Default is GET
export const loginUser = (creds) => apiRequest("/auth/login", { 
    method: "POST", 
    body: JSON.stringify(creds) 
});