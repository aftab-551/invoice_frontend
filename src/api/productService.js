const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createProduct = async (productData) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create products");
    }

    const data = await response.json();
    return data;
};

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
    }

    const data = await response.json();

    return data;
};
