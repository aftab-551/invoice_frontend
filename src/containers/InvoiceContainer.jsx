import { DataTable } from "@/components/common/DataTable";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchInvoices,
    fetchInvoicePdfBlob,
    patchInvoiceStatus,
} from "@/api/invoiceService";
import { createInvoiceColumns } from "@/components/invoices/columns";
import { errorToast, successToast } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

function formatMoney(value) {
    const n = Number(value);
    if (Number.isNaN(n)) return String(value ?? "—");
    return n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

/** Collapse legacy PAID to SENT for the two-option control */
function normalizeUiStatus(status) {
    const s = String(status ?? "PENDING").toUpperCase();
    if (s === "PAID") return "PAID";
    if (s === "SENT") return "SENT";
    return "PENDING";
}

function openPdfBlobInNewTab(blob) {
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
        URL.revokeObjectURL(url);
        throw new Error(
            "Pop-up blocked. Allow pop-ups for this site to preview PDFs."
        );
    }
    win.addEventListener(
        "beforeunload",
        () => URL.revokeObjectURL(url),
        { once: true }
    );
    setTimeout(() => URL.revokeObjectURL(url), 120_000);
}

function downloadPdfBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function InvoiceContainer() {
    const queryClient = useQueryClient();
    const [statusEdits, setStatusEdits] = useState({});
    const statusEditsRef = useRef(statusEdits);
    useEffect(() => {
        statusEditsRef.current = statusEdits;
    }, [statusEdits]);

    const { data: invoices, isPending } = useQuery({
        queryKey: ["invoices"],
        queryFn: fetchInvoices,
        select: (payload) => {
            if (!payload?.data) return [];
            return payload.data.map((invoice) => ({
                ...invoice,
                customerName: invoice.customer?.name ?? "—",
                issueDateLabel: invoice.issueDate
                    ? format(new Date(invoice.issueDate), "dd MMM yyyy")
                    : "—",
                totalAmountLabel: formatMoney(invoice.totalAmount),
            }));
        },
    });

    const statusValue = useCallback(
        (row) => {
            const idKey = String(row.id);
            if (Object.prototype.hasOwnProperty.call(statusEdits, idKey)) {
                return statusEdits[idKey];
            }
            return normalizeUiStatus(row.status);
        },
        [statusEdits]
    );

    const onStatusChange = useCallback(
        (invoiceId, next) => {
            const idKey = String(invoiceId);
            const row = invoices?.find((i) => String(i.id) === idKey);
            const baseline = normalizeUiStatus(row?.status);
            setStatusEdits((prev) => {
                const nextMap = { ...prev };
                if (next === baseline) {
                    delete nextMap[idKey];
                } else {
                    nextMap[idKey] = next;
                }
                return nextMap;
            });
        },
        [invoices]
    );

    const hasDirtyStatuses = Object.keys(statusEdits).length > 0;

    const { mutate: saveStatuses, isPending: isSaving } = useMutation({
        mutationFn: async () => {
            const entries = Object.entries(statusEditsRef.current);
            for (const [id, status] of entries) {
                await patchInvoiceStatus(id, status);
            }
        },
        onSuccess: () => {
            setStatusEdits({});
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            successToast("Invoice status saved.");
        },
        onError: (error) => {
            errorToast(
                error instanceof Error ? error : new Error(String(error))
            );
        },
    });

    const handlePreview = useCallback(async (invoice) => {
        try {
            const blob = await fetchInvoicePdfBlob(invoice.id);
            openPdfBlobInNewTab(blob);
        } catch (e) {
            errorToast(e instanceof Error ? e : new Error(String(e)));
        }
    }, []);

    const handleDownload = useCallback(async (invoice) => {
        try {
            const blob = await fetchInvoicePdfBlob(invoice.id);
            const safeName = `${invoice.invoiceNumber || invoice.id}.pdf`.replace(
                /[^\w.\-]+/g,
                "_"
            );
            downloadPdfBlob(blob, safeName);
            successToast("Invoice downloaded.");
        } catch (e) {
            errorToast(e instanceof Error ? e : new Error(String(e)));
        }
    }, []);

    const handleSend = useCallback((invoice) => {
        toast.message("Send not configured", {
            description: `Invoice ${invoice.invoiceNumber}: when email/SMS is connected, this can set status to Sent automatically.`,
        });
    }, []);

    const columns = useMemo(
        () =>
            createInvoiceColumns({
                onPreview: handlePreview,
                onDownload: handleDownload,
                onSend: handleSend,
                statusValue,
                onStatusChange,
            }),
        [
            handlePreview,
            handleDownload,
            handleSend,
            statusValue,
            onStatusChange,
        ]
    );

    const saveToolbar = (
        <div key="invoice-status-save" className="ml-auto flex items-center">
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!hasDirtyStatuses || isSaving}
                className="border-gray-300 bg-white text-black font-semibold shadow-sm hover:bg-gray-50"
                onClick={() => saveStatuses()}
            >
                {isSaving ? "Saving…" : "Save changes"}
            </Button>
        </div>
    );

    return (
        <div>
            <DataTable
                data={invoices ?? []}
                columns={columns}
                isLoading={isPending}
                getRowId={(row) => String(row.id)}
                toolbarActions={[saveToolbar]}
            />
        </div>
    );
}

export default InvoiceContainer;
