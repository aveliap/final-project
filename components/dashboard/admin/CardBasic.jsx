import { capitalizeFirstLetter } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const CardBasic = (props) => {
    const { name, data, link, icon, style, type } = props;

    return (
        <Link
            to={link}
            className="flex flex-col min-w-64 text-dark/80 h-max border rounded-2xl px-5 py-6 bg-light shadow-sm hover:shadow-md transition-template"
        >
            <div
                className={`flex w-max justify-center items-center rounded-2xl ${style} p-3`}
            >
                {icon}
            </div>
            <h1 className="font-semibold mt-4">{name}</h1>
            {type == "money" && (
                <h1 className="text-3xl font-bold">
                    <FormatRupiah value={data} />
                </h1>
            )}
            {type != "money" && (
                <h1 className="text-3xl font-bold">
                    {capitalizeFirstLetter(data)}
                </h1>
            )}
        </Link>
    );
};

export default CardBasic;
