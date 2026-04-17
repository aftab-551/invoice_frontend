export const columns = [
    {
        accessorKey: "customerName",
        cell: ({ row }) => {
            const customer = row.original.customer;
            if (!customer) return "N/A";
            return `${customer.name} - ${customer.customerNumber}`;
        },
        header: "Customer Name",
    },
    {
        accessorKey: "productName",
        cell: ({ row }) => {
        const product = row.original.product;
        if (!product) return "N/A";
            return `${product.productServiceName} - ${product.productNumber}`;
        },
        header: "Product/Service Name",
    },
    {
        accessorKey: "lastServiceDate",
        header: "Last Service Date",
    },
    {
        accessorKey: "nextServiceDate",
        header: "Next Service Date",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
];
