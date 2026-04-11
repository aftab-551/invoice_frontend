import { fetchNotification } from "@/api/notificationService";
import { DataTable } from "@/components/common/DataTable";
import { columns } from "@/components/notifications/columns";
import { useQuery } from "@tanstack/react-query";

function NotificationContainer() {
    const { data: notifications, isPending } = useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotification,
    });

    return (
        <div>
            <DataTable
                data={notifications?.data ?? []}
                columns={columns}
                isLoading={isPending}
            />
        </div>
    );
}

export default NotificationContainer;
