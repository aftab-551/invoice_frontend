import { Checkbox } from "../ui/checkbox";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="border-gray-400 data-[state=checked]:bg-[#6956fc] data-[state=checked]:text-white"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-gray-400 data-[state=checked]:bg-[#6956fc] data-[state=checked]:text-white"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "customerName",
        header: "Customer Name",
    },
    {
        accessorKey: "productName",
        header: "Product/Service Name",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "unitPrice",
        header: "Unit Price",
    },
    {
        accessorKey: "totalLineAmount",
        header: "Line Amount",
    },
];
