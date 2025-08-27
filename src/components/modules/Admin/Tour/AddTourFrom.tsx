/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation, useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addTourSchema = z.object({
    title: z.string(),
    description: z.string(),
    division: z.string(),
    tourType: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    included: z.array(z.object({ value: z.string() })),
    excluded: z.array(z.object({ value: z.string() }))
})
export default function AddTourFrom() {

    const [createTour] = useAddTourMutation()
    const [images, setImages] = useState<(File)[]>([])
    const { data: tourData } = useGetTourTypeQuery(undefined)
    const { data: divisionData } = useGetDivisionQuery(undefined)


    const divisionOption = divisionData?.data?.map((item: { _id: string, name: string }) => ({ label: item?.name, value: item?._id }))
    const tourTypeOption = tourData?.data?.data?.map((item: { _id: string, name: string }) => ({ label: item?.name, value: item?._id }))



    const form = useForm<z.infer<typeof addTourSchema>>({
        resolver: zodResolver(addTourSchema)
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "included"
    })

    const { fields: excludedFields, append: excludedAppend, remove: excludedRemove } = useFieldArray({
        control: form.control,
        name: "excluded"
    })
    console.log(fields);


    const onSubmit = async (data: z.infer<typeof addTourSchema>) => {

        const formData = new FormData()
        const toastId = toast.loading("Tour Creating...")
        const tourData = {
            ...data,
            startDate: formatISO(data.startDate),
            endDate: formatISO(data.endDate),
            included: data.included.map((item: { value: string }) => item.value)
        }
        formData.append("data", JSON.stringify(tourData))
        images?.forEach((image) => formData.append("files", image))


        console.log(tourData);

        try {
            const res = await createTour(formData).unwrap()
            console.log(res);
            if (res.success) {
                toast.success("Tour Created Successful", { id: toastId })
            }

        } catch (error: any) {
            toast.error(error.data.message)
            console.log(error);
        }

    }
    return (
        <div className=" max-w-3xl grow-1 m-auto content-center " >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
                    <FormField

                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=" flex gap-2 w-full">
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem className="flex-1 w-full " >
                                    <FormLabel>Division</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full" >
                                            {
                                                divisionOption?.map((item: { label: string, value: string }) => (

                                                    <SelectItem key={item.value} className="w-full" value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="sr-only">
                                        You can manage email addresses in your{" "}
                                        {/* <Link href="/examples/forms">email settings</Link>. */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tourType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full" >
                                            {
                                                tourTypeOption?.map((item: { value: string, label: string }) => (

                                                    <SelectItem value={item.value}>{item.label}</SelectItem>
                                                ))


                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="sr-only">
                                        You can manage email addresses in your{" "}
                                        {/* <Link href="/examples/forms">email settings</Link>. */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-5">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col flex-1">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(
                                                        new Date().setDate(new Date().getDate() - 1)
                                                    )
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col flex-1">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date(
                                                        new Date().setDate(new Date().getDate() - 1)
                                                    )
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField

                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full flex-1 ">
                                    <FormLabel className="m-0 p-0">Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex-1 w-full">


                            <MultipleImageUploader onChange={setImages} />
                        </div>
                    </div>
                    <div className="w-full border-t border-muted-foreground"></div>

                    <div>
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-xl">Included</p>
                            <Button variant={`outline`} type="button" onClick={() => append({ value: "" })}>
                                <Plus />
                            </Button>
                        </div>
                        {
                            fields?.map((item, index) => (
                                <div className=" flex gap-2 items-center w-full my-2 justify-center ">

                                    <FormField

                                        control={form.control}
                                        name={`included.${index}.value`}
                                        key={item.id}
                                        render={({ field }) => (
                                            <FormItem className="w-full">

                                                <FormControl>
                                                    <Input placeholder="Title" {...field} />
                                                </FormControl>
                                                <FormDescription className="sr-only">
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button

                                        onClick={() => remove(index)}
                                        type="button">
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-xl">Excluded</p>
                            <Button variant={`outline`} type="button" onClick={() => excludedAppend({ value: "" })}>
                                <Plus />
                            </Button>
                        </div>
                        {
                            excludedFields?.map((item, index) => (
                                <div className=" flex gap-2 items-center w-full my-2 justify-center ">

                                    <FormField

                                        control={form.control}
                                        name={`excluded.${index}.value`}
                                        key={item.id}
                                        render={({ field }) => (
                                            <FormItem className="w-full">

                                                <FormControl>
                                                    <Input placeholder="Title" {...field} />
                                                </FormControl>
                                                <FormDescription className="sr-only">
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button

                                        onClick={() => excludedRemove(index)}
                                        type="button">
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    );
};
