import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";

export default function AddDivision() {
    return (
        <div>
            <div className=" flex items-center justify-between  lg:px-16 mx-auto ">
                <h1>Add Division </h1>
                <AddDivisionModal />
            </div>
        </div>
    );
};
