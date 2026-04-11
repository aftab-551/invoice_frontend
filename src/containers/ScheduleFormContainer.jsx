import { SCHEDULE_DEFAULT_VALUES } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleSchema } from "@/lib/formValidations";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/utils";
import { createSchedule } from "@/api/scheduleService";
import { fetchProducts } from "@/api/productService";
import { fetchCustomers } from "@/api/customerService";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import { setHours, setMinutes } from "date-fns";

function ScheduleFormContainer({
    isDialogOpen,
    handleShowDialog,
    queryClient,
}) {
    const myForm = useForm({
        resolver: zodResolver(scheduleSchema),
        defaultValues: SCHEDULE_DEFAULT_VALUES,
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
        mutationFn: createSchedule,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });

            successToast("Schedule created successfully!");

            handleShowDialog();
        },
        onError: (error) => {
            errorToast(error);
        },
    });

    const timeToIso = (time) => {
        const timeString = time;
        const [hours, minutes] = timeString.split(":").map(Number);

        const withHours = setHours("1970-01-01", hours);
        const withTime = setMinutes(withHours, minutes);

        const isoTime = withTime.toISOString();

        return isoTime;
    };

    const onSubmit = (data) => {
        data.lastServiceDate = data.lastServiceDate.toISOString();
        data.nextServiceDate = data.nextServiceDate.toISOString();
        data.time = timeToIso(data.time);

        mutate(data);
    };

    useEffect(() => {
        if (!isDialogOpen) {
            setTimeout(() => {
                myForm.reset(SCHEDULE_DEFAULT_VALUES, {
                    keepValues: false,
                });
            }, 400);
        }
    }, [isDialogOpen]);

    return (
        <ScheduleForm
            isDialogOpen={isDialogOpen}
            handleShowDialog={handleShowDialog}
            myForm={myForm}
            onSubmit={onSubmit}
            isPending={isPending}
            data={{ customers, products }}
        />
    );
}

export default ScheduleFormContainer;
