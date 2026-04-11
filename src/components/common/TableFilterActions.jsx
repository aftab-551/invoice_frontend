import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "./Spinner";

function TableFilterActions({
    globalFilter,
    setGlobalFilter,
    handleShowDialog,
    toolbarActions,
}) {
    return (
        <div className="flex justify-between items-center py-4">
            <Input
                placeholder="Search..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
            />
            {handleShowDialog && (
                <Button onClick={() => handleShowDialog()}
                className="text-black font-semibold px-4 py-2 rounded-lg">
                    Add Record
                </Button>
            )}
            {toolbarActions?.length && toolbarActions.map((action) => action)}
        </div>
    );
}

export default TableFilterActions;
