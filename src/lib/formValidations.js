import { z } from "zod";

export const customerSchema = z.object({
    name: z.string().min(1).max(100),
    phoneNumber: z.string().min(1).max(20),
    email: z.string().email("Invalid email address").or(z.literal("")),
    location: z.string().min(1).max(100),
    postCode: z.coerce
        .number({ invalid_type_error: "Postcode must be a number" })
        .positive(),
    suburb: z.string().min(1).max(100),
});

export const productSchema = z.object({
    productType: z.string().min(1),
    productServiceName: z.string().min(1).max(100),
    unitPrice: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .positive(),
    unit: z.string().min(1).max(50),
});

export const scheduleSchema = z.object({
    customerId: z.coerce
        .number({ invalid_type_error: "Please select a customer" })
        .positive("Please select a customer"),
    productId: z.coerce
        .number({ invalid_type_error: "Please select a product" })
        .positive("Please select a product"),
    lastServiceDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Please select a date",
    }),
    nextServiceDate: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Please select a date",
    }),
    time: z.string().min(1, { message: "Please select a time" }),
});

export const transactionSchema = z.object({
    customerId: z.coerce
        .number({ invalid_type_error: "Please select a customer" })
        .positive("Please select a customer"),
    productId: z.coerce
        .number({ invalid_type_error: "Please select a product" })
        .positive("Please select a product"),
    date: z.date({
        required_error: "Please select a date",
        invalid_type_error: "Please select a date",
    }),
    unit: z.string().min(1).max(100),
    quantity: z.coerce
        .number({ invalid_type_error: "Please enter a number" })
        .positive("Please enter a positive number"),
    unitPrice: z.coerce
        .number({ invalid_type_error: "Please enter a number" })
        .positive("Please enter a positive number"),
});
