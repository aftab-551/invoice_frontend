const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createCustomer = async (customerData) => {
    const response = await fetch(`${BASE_URL}/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create customer");
    }

    const data = await response.json();
    return data;
};

export const fetchCustomers = async () => {
    const response = await fetch(`${BASE_URL}/customers`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create customer");
    }

    const data = await response.json();

    return data;
};
