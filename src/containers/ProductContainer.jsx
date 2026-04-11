import { DataTable } from "@/components/common/DataTable";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/api/productService";
import { columns } from "@/components/products/columns";
import ProductFormContainer from "./ProductFormContainer";

function ProductContainer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: products, isPending } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        select: (products) => {
            if (!products) return [];

            return products.data.map((product) => ({
                ...product,
                productType:
                    product.productType === "PRODUCT" ? "Product" : "Service",
            }));
        },
    });

    const handleShowDialog = () => {
        setIsDialogOpen((prevState) => !prevState);
    };

    return (
        <div>
            <ProductFormContainer
                isDialogOpen={isDialogOpen}
                handleShowDialog={handleShowDialog}
                queryClient={queryClient}
            />
            <DataTable
                data={products ?? []}
                columns={columns}
                handleShowDialog={handleShowDialog}
                isLoading={isPending}
            />
        </div>
    );
}

export default ProductContainer;
