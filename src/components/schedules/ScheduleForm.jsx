import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import DialogTransition from "../common/DialogTransition";
import Spinner from "../common/Spinner";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

function ScheduleForm({
    isDialogOpen,
    handleShowDialog,
    myForm,
    onSubmit,
    isPending,
    data,
}) {
    return (
        <DialogTransition
            isShowing={isDialogOpen}
            setIsShowing={handleShowDialog}
        >
            <Form {...myForm}>
                <form onSubmit={myForm.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-7">
                        <FormField
                            control={myForm.control}
                            name="customerId"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Customer</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? data.customers.find(
                                                              (customer) =>
                                                                  customer.id ===
                                                                  field.value
                                                          )?.name
                                                        : "Select customer"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search customer..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No customer found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {data.customers.map(
                                                            (customer) => (
                                                                <CommandItem
                                                                    value={
                                                                        customer.name
                                                                    }
                                                                    key={
                                                                        customer.id
                                                                    }
                                                                    onSelect={() => {
                                                                        myForm.setValue(
                                                                            "customerId",
                                                                            customer.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        customer.name
                                                                    }
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            customer.id ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="productId"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Product</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? data.products.find(
                                                              (product) =>
                                                                  product.id ===
                                                                  field.value
                                                          )?.name
                                                        : "Select product"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search product..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No product found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {data.products.map(
                                                            (product) => (
                                                                <CommandItem
                                                                    value={
                                                                        product.name
                                                                    }
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    onSelect={() => {
                                                                        myForm.setValue(
                                                                            "productId",
                                                                            product.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            product.id ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="lastServiceDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Last Service Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="nextServiceDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Next Service Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="ml-7 mb-5 w-20"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Spinner textColor="text-white" />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </Form>
        </DialogTransition>
    );
}

export default ScheduleForm;
