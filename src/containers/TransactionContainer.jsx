import { DataTable } from "@/components/common/DataTable";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTransaction } from "@/api/transactionService";
import TransactionFormContainer from "./TransactionFormContainer";
import { format } from "date-fns";
import { columns } from "@/components/transactions/columns";
import { generateInvoice } from "@/api/invoiceService";
import { errorToast, successToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function TransactionContainer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    const queryClient = useQueryClient();

    const { data: transactions, isPending } = useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransaction,
        select: (transactions) => {
            if (!transactions) return [];

            return transactions.data.map((transaction) => ({
                ...transaction,
                customerName: transaction.customer.name,
                productName: transaction.product.productServiceName,
                date: transaction.date
                    ? format(new Date(transaction.date), "dd MMM yyyy")
                    : "-",
            }));
        },
    });

    const handleShowDialog = () => {
        setIsDialogOpen((prevState) => !prevState);
    };

    const selectedRowObjects = useMemo(() => {
        const selectedKeys = Object.keys(rowSelection).filter(
            (key) => rowSelection[key]
        );
        if (!transactions?.length) return [];
        return selectedKeys
            .map((key) =>
                transactions.find((row) => String(row.id) === String(key))
            )
            .filter(Boolean);
    }, [rowSelection, transactions]);

    const canGenerateInvoice = useMemo(() => {
        if (selectedRowObjects.length === 0) return false;
        const firstCustomerId = Number(selectedRowObjects[0]?.customerId);
        if (Number.isNaN(firstCustomerId)) return false;
        return selectedRowObjects.every(
            (row) => Number(row.customerId) === firstCustomerId
        );
    }, [selectedRowObjects]);

    const selectedTransactionIds = selectedRowObjects.map((row) => row.id);
    const customerId =
        selectedRowObjects.length > 0
            ? selectedRowObjects[0]?.customerId
            : null;

    const { mutate, isPending: isGenerating } = useMutation({
        mutationFn: () =>
            generateInvoice({
                selectedTransactionIds: selectedTransactionIds,
                customerId,
                saveOnly: true,
            }),
        onSuccess: (data) => {
            setRowSelection({});
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            const num = data?.invoice?.invoiceNumber;
            successToast(
                num
                    ? `Invoice ${num} saved successfully.`
                    : "Invoice saved successfully."
            );
        },
        onError: (error) => {
            errorToast(error);
        },
    });

    const handleGenerateInvoice = () => {
        if (!canGenerateInvoice) {
            errorToast(
                "Select one or more uninvoiced transactions for the same customer."
            );
            return;
        }
        mutate();
    };

    const generateInvoiceButton = (
        <Button
            key="generate-invoice"
            onClick={handleGenerateInvoice}
            disabled={!canGenerateInvoice || isGenerating}
            size="sm"
            className="ml-auto bg-white hover:bg-gray-100 text-black border border-gray-300 shadow-sm"
        >
            {isGenerating
                ? "Processing..."
                : `Generate invoice${selectedRowObjects.length > 1 ? ` (${selectedRowObjects.length})` : ""}`}
        </Button>
    );

    return (
        <div>
            <TransactionFormContainer
                isDialogOpen={isDialogOpen}
                handleShowDialog={handleShowDialog}
                queryClient={queryClient}
            />
            <DataTable
                data={transactions ?? []}
                columns={columns}
                handleShowDialog={handleShowDialog}
                isLoading={isPending}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
                getRowId={(row) => String(row.id)}
                toolbarActions={[generateInvoiceButton]}
            />
        </div>
    );
}

export default TransactionContainer;
