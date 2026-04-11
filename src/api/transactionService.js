const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTransaction = async (transactionData) => {
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transaction");
    }

    const data = await response.json();
    return data;
};

export const fetchTransaction = async () => {
    const response = await fetch(`${BASE_URL}/transactions`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch transactions");
    }

    const data = await response.json();

    return data;
};
