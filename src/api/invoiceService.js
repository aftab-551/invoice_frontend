const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchInvoices = async () => {
    const response = await fetch(`${BASE_URL}/invoices`);

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            /* ignore */
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

export const patchInvoiceStatus = async (invoiceId, status) => {
    const response = await fetch(`${BASE_URL}/invoices/${invoiceId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const err = await response.json();
            errorMessage = err.message || errorMessage;
        } catch {
            /* ignore */
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

/** Returns PDF blob for an invoice (server sets disposition; blob is the same either way). */
export const fetchInvoicePdfBlob = async (invoiceId) => {
    const response = await fetch(`${BASE_URL}/invoices/${invoiceId}/pdf`);

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const err = await response.json();
            errorMessage = err.message || errorMessage;
        } catch {
            /* ignore */
        }
        throw new Error(errorMessage);
    }

    return response.blob();
};

export const generateInvoice = async ({
    selectedTransactionIds,
    customerId,
    saveOnly = false,
}) => {
    const response = await fetch(`${BASE_URL}/invoices/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            customerTransactionIds: selectedTransactionIds,
            customerId: customerId,
            saveOnly,
        }),
    });

    // Handle Errors Safely
    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = `HTTP error! status: ${response.status}`;

        if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData?.message || errorMessage;
        } else {
            // If it's HTML (the 404/500 page), we grab the text instead of crashing on .json()
            const errorText = await response.text();
            console.error("Backend HTML Error:", errorText);
            errorMessage = "Server returned an error page. Check Backend console.";
        }

        throw new Error(errorMessage);
    }

    if (saveOnly) {
        return response.json();
    }

    const blob = await response.blob();
    return { blob, response };
};