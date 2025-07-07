import { capitalizeFirstLetter, formatDate, limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const AdminCardCampaign = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/campaign/${item.id}`}
            className="text-dark/85 bg-light shadow-md outline-none w-full p-4 border rounded-md flex gap-3 flex-col cursor-pointer transition-templates"
        >
            <div className="flex justify-between">
                <h1 className="font-medium">{limitText(item.title, 20)}</h1>
                <div
                    className={`px-2 py-1 rounded-full font-medium text-xs
                    ${
                        item.status === "IN_REVIEW" &&
                        "text-yellow-500 bg-yellow-50"
                    }
                    ${item.status === "ACTIVE" && "text-primary bg-emerald-50"}
                    ${item.status === "COMPLETED" && "text-blue-500 bg-blue-50"}
                    ${item.status === "REJECTED" && "text-error bg-red-50"}
                    `}
                >
                    <h1>{capitalizeFirstLetter(item.status)}</h1>
                </div>
            </div>
            <div className="flex flex-row justify-between text-sm text-dark/80">
                <h1>{item.category}</h1>
            </div>
        </Link>
    );
};

export default AdminCardCampaign;
