import { TRANSACTION_DEFAULT_VALUES } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/formValidations";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/utils";
import { createTransaction } from "@/api/transactionService";
import { fetchProducts } from "@/api/productService";
import { fetchCustomers } from "@/api/customerService";
import TransactionForm from "@/components/transactions/TransactionForm";

function TransactionFormContainer({
    isDialogOpen,
    handleShowDialog,
    queryClient,
}) {
    const myForm = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: TRANSACTION_DEFAULT_VALUES,
    });

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        select: (products) => {
            if (!products) return [];

            return products.data.map((product) => ({
                id: product.id,
                name: product.productServiceName,
            }));
        },
    });

    const { data: customers } = useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
        select: (customers) => {
            if (!customers) return [];

            return customers.data.map((customer) => ({
                id: customer.id,
                name: customer.name,
            }));
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createTransaction,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });

            successToast("Transaction created successfully!");

            handleShowDialog();
        },
        onError: (error) => {
            errorToast(error);
        },
    });

    const onSubmit = (data) => {
        data.date = data.date.toISOString();

        mutate(data);
    };

    useEffect(() => {
        if (!isDialogOpen) {
            setTimeout(() => {
                myForm.reset(TRANSACTION_DEFAULT_VALUES, {
                    keepValues: false,
                });
            }, 400);
        }
    }, [isDialogOpen]);

    return (
        <TransactionForm
            isDialogOpen={isDialogOpen}
            handleShowDialog={handleShowDialog}
            myForm={myForm}
            onSubmit={onSubmit}
            isPending={isPending}
            data={{ customers, products }}
        />
    );
}

export default TransactionFormContainer;
