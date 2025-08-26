import SingleImageUploader from "@/components/SingleImageUploader"
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
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const typeSchema = z.object({
    name: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    description: z.string()
})


export function AddDivisionModal() {

    const [image, setImage] = useState<File | null>(null)
    console.log(image);
    const form = useForm<z.infer<typeof typeSchema>>({
        resolver: zodResolver(typeSchema)
    })

    const onSubmit = async (data: z.infer<typeof typeSchema>) => {
        try {
            const formData = new FormData()
            formData.append("data", JSON.stringify(data))
            formData.append("file", image as File)

            console.log(data);
        }
        catch (error) {
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
                                        <FormLabel>Tour Type </FormLabel>
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
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea  {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <SingleImageUploader onChange={setImage} />
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
