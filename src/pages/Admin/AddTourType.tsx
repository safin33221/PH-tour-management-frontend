import { DeleteConformation } from "@/components/DeleteConformation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTourType() {
    const { data } = useGetTourTypeQuery(undefined)
    const [removeTourType] = useRemoveTourTypeMutation()

    const handleRemoveTourType = async (tourTypeId: string) => {
        const toastId = toast.loading("Removing..")
        try {
            const res = await removeTourType(tourTypeId).unwrap()
            if (res?.success) {
                toast.success("Removed", { id: toastId })
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="w-full max-w-7xl px-5 mx-auto">
            <div className="flex items-center justify-between py-5">
                <h1>Tour Type</h1>
                <AddTourTypeModal />
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Type Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data?.data?.map((item: { name: string, _id: string }) => (
                            <TableRow>
                                <TableCell className="font-medium">{item?.name}</TableCell>

                                <TableCell className="text-right">
                                    <DeleteConformation onConfirm={() => handleRemoveTourType(item._id)}>
                                        <Button>
                                            <Trash2 />
                                        </Button>

                                    </DeleteConformation>
                                </TableCell>
                            </TableRow>)
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};
