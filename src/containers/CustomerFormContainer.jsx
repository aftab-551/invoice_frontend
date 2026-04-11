import CustomerForm from "@/components/customers/CustomerForm";
import { CUSTOMER_DEFAULT_VALUES } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "@/lib/formValidations";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "@/api/customerService";
import { errorToast, successToast } from "@/lib/utils";

function CustomerFormContainer({
    isDialogOpen,
    handleShowDialog,
    queryClient,
}) {
    const myForm = useForm({
        resolver: zodResolver(customerSchema),
        defaultValues: CUSTOMER_DEFAULT_VALUES,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createCustomer,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });

            successToast("Customer created successfully!");

            handleShowDialog();
        },
        onError: (error) => {
            errorToast(error);
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (!isDialogOpen) {
            setTimeout(() => {
                myForm.reset(CUSTOMER_DEFAULT_VALUES, {
                    keepValues: false,
                });
            }, 400);
        }
    }, [isDialogOpen]);

    return (
        <CustomerForm
            isDialogOpen={isDialogOpen}
            handleShowDialog={handleShowDialog}
            myForm={myForm}
            onSubmit={onSubmit}
            isPending={isPending}
        />
    );
}

export default CustomerFormContainer;
