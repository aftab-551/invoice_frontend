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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

function ProductForm({
    isDialogOpen,
    handleShowDialog,
    myForm,
    onSubmit,
    isPending,
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
                            name="productType"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Product Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select product type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PRODUCT">
                                                Product
                                            </SelectItem>
                                            <SelectItem value="SERVICE">
                                                Service
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="productServiceName"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Product/Service Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="unitPrice"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Unit Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Unit</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="ml-7 mb-5 w-20 bg-[#6956fc]"
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

export default ProductForm;
