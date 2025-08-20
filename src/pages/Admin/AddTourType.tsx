import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourType() {
    const { data } = useGetTourTypeQuery(undefined)
    console.log(data?.data);

    return (
        <div className="w-full max-w-7xl px-5 mx-auto">
            <div className="flex items-center justify-between py-5">
                <h1>Tour Type</h1>
               <AddTourTypeModal/>
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
                        data?.data?.data?.map((item: { name: string }) => (
                            <TableRow>
                                <TableCell className="font-medium">{item?.name}</TableCell>

                                <TableCell className="text-right">
                                    <Button>
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>)
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};
