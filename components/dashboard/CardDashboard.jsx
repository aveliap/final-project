import { capitalizeFirstLetter } from "@/utils/Utils";
import React from "react";
import { Link } from "react-router-dom";

const CardDashboard = ({ link, name, data, icon }) => {
    return (
        <Link
            to={link}
            className={`flex flex-row items-starts max-w-lg gap-4 w-full overflow-hidden rounded-2xl transition-template hover:border hover:border-primary bg-white px-5 py-6 shadow-md border`}
        >
            <div
                className={`flex justify-center items-center rounded-2xl bg-primary/15 p-3`}
            >
                {icon}
            </div>
            <div className="flex flex-col justify-end gap-1">
                <h2 className="text-4xl lg:text-5xl font-semibold leading-none text-slate-800/80">
                    {capitalizeFirstLetter(data)}
                </h2>
                <h1 className="text-sm lg:text-lg font-medium text-slate-800/80">
                    {name}
                </h1>
            </div>
        </Link>
    );
};

export default CardDashboard;
