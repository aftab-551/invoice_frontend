import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Spinner from "./Spinner";
import { DataTablePagination } from "./DataTablePagination";

import { rankItem } from "@tanstack/match-sorter-utils";
import { useState } from "react";
import TableFilterActions from "./TableFilterActions";

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({ itemRank });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export function DataTable({
    columns,
    data,
    tableHeight = "h-full",
    columnVisibility,
    isLoading,
    handleShowDialog,
    rowSelection,
    onRowSelectionChange,
    toolbarActions,
    getRowId,
}) {
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        ...(getRowId ? { getRowId } : {}),
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        enableRowSelection: !!onRowSelectionChange,
        onRowSelectionChange: onRowSelectionChange,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "fuzzy",
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnVisibility,
            globalFilter,
            ...(rowSelection && { rowSelection }),
        },
    });

    return (
        <>
            <TableFilterActions
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                handleShowDialog={handleShowDialog}
                toolbarActions={toolbarActions}
            />
            <div className="rounded-xl border border-[#ebeaea] shadow-lg">
                <div
                    className={`${tableHeight} relative overflow-auto rounded-xl`}
                >
                    <Table className="text-xs md:text-sm">
                        <TableHeader className="bg-[#6956fc]">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`text-white w-[${header.getSize()}px]`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className="bg-white"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        {isLoading ? (
                                            <Spinner />
                                        ) : (
                                            "No results."
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="mt-5">
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
