const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNotification = async () => {
    const response = await fetch(`${BASE_URL}/notifications`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch notifications");
    }

    const data = await response.json();

    return data;
};
