import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const CardDonation = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/donor/${item.id}`}
            className="text-dark/85 w-full bg-light p-4 border rounded-md  cursor-pointer flex flex-col gap-2 transition-template shadow-sm"
        >
            <div>
                <h1 className="font-medium">
                    {item.isAnonymous ? "Good People" : item.donorName}
                </h1>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
                <h1 className="text-primary">
                    <FormatRupiah value={item.amount} />
                </h1>
                <h1 className="text-right">{formatDate(item.donationDate)}</h1>
            </div>
        </Link>
    );
};

export default CardDonation;
