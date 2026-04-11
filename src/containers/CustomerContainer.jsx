import { DataTable } from "@/components/common/DataTable";
import { columns } from "@/components/customers/columns";
import React, { useState } from "react";
import CustomerFormContainer from "./CustomerFormContainer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers } from "@/api/customerService";

function CustomerContainer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: customers, isPending } = useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
    });

    const handleShowDialog = () => {
        setIsDialogOpen((prevState) => !prevState);
    };

    return (
        <div>
            <CustomerFormContainer
                isDialogOpen={isDialogOpen}
                handleShowDialog={handleShowDialog}
                queryClient={queryClient}
            />
            <DataTable
                data={customers?.data ?? []}
                columns={columns}
                handleShowDialog={handleShowDialog}
                isLoading={isPending}
            />
        </div>
    );
}

export default CustomerContainer;
