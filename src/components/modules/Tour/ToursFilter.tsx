import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { useSearchParams } from "react-router";
export default function ToursFilter() {

    const [searchParams, setSearchParams] = useSearchParams()
    const selectedDivision = searchParams.get("division") || undefined;
    const selectedTourTyped = searchParams.get("tourType") || undefined;

    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionQuery(undefined)
    const { data: TourData, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined)

    const divisionOption = divisionData?.data?.map((item: { name: string, _id: string }) => ({
        label: item.name,
        value: item._id
    }))
    const tourOption = TourData?.data?.data?.map((item: { name: string, _id: string }) => ({
        label: item.name,
        value: item._id
    }))


    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("division", value)
        setSearchParams(params)

    }
    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("tourType", value)
        setSearchParams(params)
    }

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("division")
        params.delete("tourType")
        setSearchParams(params)
    }

    return (
        <div className="col-span-3 border border-muted bg-background rounded-xl my-10 h-96 w-full p-10 sticky top-0">
            <div className="flex justify-between items-center">
                <h1>Filter</h1>
                <Button variant={`outline`} onClick={handleClearFilter}>
                    Clear
                </Button>
            </div>
            <div className="">
                <Label className="mb-2">Division to visit</Label>
                <Select
                    onValueChange={handleDivisionChange}
                    value={selectedDivision ? selectedDivision : ''}
                    disabled={divisionLoading}

                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {
                                divisionOption?.map((item: { label: string, value: string }) => (

                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>

                                ))
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-2">Tour Type</Label>
                <Select

                    onValueChange={handleTourTypeChange}
                    value={selectedTourTyped ? selectedTourTyped : ''}
                    disabled={tourTypeLoading}

                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {
                                tourOption?.map((item: { label: string, value: string }) => (

                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>

                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
