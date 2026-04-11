import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DownloadIcon, EyeIcon, SendIcon } from "lucide-react";

export function createInvoiceColumns({
    onPreview,
    onDownload,
    onSend,
    statusValue,
    onStatusChange,
}) {
    return [
        {
            accessorKey: "invoiceNumber",
            header: "Invoice #",
        },
        {
            accessorKey: "customerName",
            header: "Customer",
        },
        {
            accessorKey: "issueDateLabel",
            header: "Issue date",
        },
        {
            accessorKey: "totalAmountLabel",
            header: "Total",
        },
        {
            id: "status",
            header: "Status",
            enableSorting: false,
            cell: ({ row }) => {
                const inv = row.original;
                const value = statusValue(inv);
                return (
                    <Select
                        value={value}
                        onValueChange={(next) =>
                            onStatusChange(inv.id, next)
                        }
                    >
                        <SelectTrigger className="h-8 w-[130px] border-gray-300 bg-white text-black">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="SENT">Sent</SelectItem>
                            <SelectItem value="PAID">Paid</SelectItem>
                        </SelectContent>
                    </Select>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            enableSorting: false,
            cell: ({ row }) => {
                const inv = row.original;
                return (
                    <div className="flex flex-wrap items-center gap-1.5">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 text-black border-gray-300 bg-white hover:bg-gray-50"
                            onClick={() => onPreview(inv)}
                        >
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 text-black border-gray-300 bg-white hover:bg-gray-50"
                            onClick={() => onDownload(inv)}
                        >
                            <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 text-black border-gray-300 bg-white hover:bg-gray-50"
                            onClick={() => onSend(inv)}
                        >
                            <SendIcon className="w-4 h-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];
}
