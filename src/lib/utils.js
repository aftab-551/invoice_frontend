import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function successToast(description) {
    toast.success("Success", {
        description,
        style: {
            background: "#d1fae5",
            color: "#065f46",
            borderColor: "#d1fae5",
        },
        closeButton: true,
    });
}

export function errorToast(error) {
    toast.warning("Error", {
        description: error.message,
        style: {
            background: "#f9d1d1",
            color: "#5e0606",
            borderColor: "#f9d1d1",
        },
        closeButton: true,
    });
}
