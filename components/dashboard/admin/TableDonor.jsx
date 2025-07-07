import Button from "@/components/Button";
import IconDetail from "@/components/IconDetail";
import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter, formatPhoneNumber } from "@/utils/Utils";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableDonor = () => {
    const { donors, paging } = useSelector((state) => state.adminDonor);
    const { page, size } = paging;

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        <div className="overflow-scroll text-dark/80 font-medium">
            <div className="w-[1280px] xl:w-full border bg-light rounded-lg">
                <div className="grid grid-cols-[1fr,4fr,4fr,4fr,4fr,2fr] px-6 py-4 border-b gap-x-4">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Email</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Phone Number</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Total Point</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={donors}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"} 
                                ${index + 1 != donors.length && "border-b"}
                                grid grid-cols-[1fr,4fr,4fr,4fr,4fr,2fr] px-6 py-3 items-center gap-x-4 break-words`}
                        >
                            <div className="col-start-1">
                                <h1>{calculateRowNumber(index)}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{capitalizeFirstLetter(item.name)}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.email}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{formatPhoneNumber(item.phone)}</h1>
                            </div>
                            <div className="col-start-5">
                                <h1>{item.totalPoints}</h1>
                            </div>
                            <div className="col-start-6">
                                <Link to={`/dashboard/admin/donor/${item.id}`}>
                                    <IconDetail />
                                </Link>
                            </div>
                        </div>
                    )}
                />
                {donors.length == 0 && (
                    <h1 className="text-center py-6">Campaign Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TableDonor;
