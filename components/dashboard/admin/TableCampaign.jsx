import IconDetail from "@/components/IconDetail";
import EachUtils from "@/utils/EachUtils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableCampaign = (props) => {
    const { campaigns, paging } = useSelector((state) => state.adminCampaign);
    const { page, size } = paging;

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        <div className="overflow-scroll text-dark/80 font-medium">
            <div className="w-[1280px] xl:w-full border bg-light rounded-lg">
                <div className="grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-4 border-b gap-x-2">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Foundation Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Campaign Title</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Category</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Raise Amount</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Goal Amount</h1>
                    </div>
                    <div className="col-start-7">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={campaigns}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"} 
                                ${index + 1 != campaigns.length && "border-b"}
                                grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-3 items-center gap-x-2`}
                        >
                            <div className="col-start-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{item.partnerName}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{item.category}</h1>
                            </div>
                            <div className="col-start-5">
                                {item.status !== "REJECTED" &&
                                item.status !== "IN_REVIEW" ? (
                                    <FormatRupiah value={item.currentAmount} />
                                ) : (
                                    "-"
                                )}
                            </div>
                            <div className="col-start-6">
                                <FormatRupiah value={item.goalAmount} />
                            </div>
                            <div className="col-start-7">
                                <Link
                                    to={`/dashboard/admin/campaign/${item.id}`}
                                >
                                    <IconDetail />
                                </Link>
                            </div>
                        </div>
                    )}
                />
                {campaigns.length == 0 && (
                    <h1 className="text-center py-6">Campaign Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TableCampaign;
