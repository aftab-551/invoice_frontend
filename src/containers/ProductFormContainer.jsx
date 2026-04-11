import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/formValidations";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/api/productService";
import { errorToast, successToast } from "@/lib/utils";
import ProductForm from "@/components/products/ProductForm";

function ProductFormContainer({ isDialogOpen, handleShowDialog, queryClient }) {
    const myForm = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: PRODUCT_DEFAULT_VALUES,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });

            successToast("Product created successfully!");

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
                myForm.reset(PRODUCT_DEFAULT_VALUES, {
                    keepValues: false,
                });
            }, 400);
        }
    }, [isDialogOpen]);

    return (
        <ProductForm
            isDialogOpen={isDialogOpen}
            handleShowDialog={handleShowDialog}
            myForm={myForm}
            onSubmit={onSubmit}
            isPending={isPending}
        />
    );
}

export default ProductFormContainer;
