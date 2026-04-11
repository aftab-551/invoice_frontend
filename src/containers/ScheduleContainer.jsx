import { DataTable } from "@/components/common/DataTable";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSchedule } from "@/api/scheduleService";
import { columns } from "@/components/schedules/columns";
import ScheduleFormContainer from "./ScheduleFormContainer";
import { format } from "date-fns";

function ScheduleContainer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: schedules, isPending } = useQuery({
        queryKey: ["schedules"],
        queryFn: fetchSchedule,
        select: (schedules) => {
            if (!schedules) return [];

            return schedules.data.map((schedule) => ({
                ...schedule,
                customerName: schedule.customer.name,
                productName: schedule.product.productServiceName,
                lastServiceDate: schedule.lastServiceDate
                    ? format(new Date(schedule.lastServiceDate), "dd MMM yyyy")
                    : "-",
                nextServiceDate: schedule.nextServiceDate
                    ? format(new Date(schedule.nextServiceDate), "dd MMM yyyy")
                    : "-",
                time: format(new Date(schedule.time), "hh:mm a"),
            }));
        },
    });

    const handleShowDialog = () => {
        setIsDialogOpen((prevState) => !prevState);
    };

    return (
        <div>
            <ScheduleFormContainer
                isDialogOpen={isDialogOpen}
                handleShowDialog={handleShowDialog}
                queryClient={queryClient}
            />
            <DataTable
                data={schedules ?? []}
                columns={columns}
                handleShowDialog={handleShowDialog}
                isLoading={isPending}
            />
        </div>
    );
}

export default ScheduleContainer;
