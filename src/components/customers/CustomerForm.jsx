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

function CustomerForm({
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
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="postCode"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Post Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={myForm.control}
                            name="suburb"
                            render={({ field }) => (
                                <FormItem className="w-full lg:flex-1">
                                    <FormLabel>Suburb</FormLabel>
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
                        className="ml-7 mb-5 w-20 text-black font-semibold"
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

export default CustomerForm;
