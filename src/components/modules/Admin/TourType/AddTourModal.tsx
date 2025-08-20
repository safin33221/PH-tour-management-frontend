import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourTypeMutation } from "@/redux/features/Tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const typeSchema = z.object({
    name: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
})


export function AddTourTypeModal() {
    const form = useForm<z.infer<typeof typeSchema>>({
        resolver: zodResolver(typeSchema)
    })
    const [addTourType] = useAddTourTypeMutation()
    const onSubmit = async (data: z.infer<typeof typeSchema>) => {
        try {
            const res = await addTourType({ name: data.name })
            if (res?.data?.success) {
                toast.success("Tour Added Successful")
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Tour Type</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Tour Type</DialogTitle>

                    </DialogHeader>
                    <Form {...form}>
                        <form
                            id="add-tour-type"
                            onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Type Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tour Type" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="add-tour-type" type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
