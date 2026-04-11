const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createSchedule = async (scheduleDate) => {
    const response = await fetch(`${BASE_URL}/schedules`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleDate),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create schedules");
    }

    const data = await response.json();
    return data;
};

export const fetchSchedule = async () => {
    const response = await fetch(`${BASE_URL}/schedules`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch schedules");
    }

    const data = await response.json();

    return data;
};
