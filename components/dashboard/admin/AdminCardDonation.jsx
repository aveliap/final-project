import { formatDate, limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const AdminCardDonation = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/campaign/${item.campaignId}`}
            className="text-dark/85 w-full bg-light p-4 relative gap-2 border rounded-md cursor-pointer transition-template shadow-sm flex flex-col"
        >
            <div className="w-full flex justify-between items-center">
                <h1 className="font-medium">
                    {limitText(item.campaignName, 24)}
                </h1>
            </div>
            {item.rewardPoints > 0 && (
                <div className="flex justify-center items-center absolute -top-3 -right-2 bg-blue-500 aspect-square w-8  rounded-full">
                    <h1 className="text-light text-xs font-semibold">
                        +{item.rewardPoints}
                    </h1>
                </div>
            )}
            <div className="w-full flex flex-row justify-between items-end">
                <div className="flex flex-col text-xs w-full">
                    <div className="flex justify-between">
                        <h1>Donation</h1>
                        <h1 className="text-primary font-medium">
                            <FormatRupiah value={item.amount} />
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>Tree Donation</h1>
                        <h1 className="text-primary font-medium">
                            <FormatRupiah value={item.donateTreeAmount} />
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>Operational Donation</h1>
                        <h1 className="text-primary font-medium">
                            <FormatRupiah
                                value={item.operationalDonationAmount}
                            />
                        </h1>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AdminCardDonation;
