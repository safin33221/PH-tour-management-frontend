import { DeleteConformation } from "@/components/DeleteConformation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

export default function AddTourType() {
    const [removeTourType] = useRemoveTourTypeMutation()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data } = useGetTourTypeQuery({ page: currentPage })
    const totalPage: number = data?.data?.meta?.totalPage
    console.log(data);

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
                            <TableRow key={item._id}>
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

            <div className=" flex justify-end">
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious


                                    onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1) as number)}
                                    className={currentPage === 1 ? "opacity-50 " : " cursor-pointer"}
                                />
                            </PaginationItem>
                            {
                                Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                                    <PaginationItem
                                        onClick={() => setCurrentPage(page)}
                                        // className={currentPage === page ? "bg-primary" : ""}


                                    >
                                        <PaginationLink isActive={currentPage === page} >{page}</PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className={currentPage === totalPage ? "opacity-50 " : " cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};
