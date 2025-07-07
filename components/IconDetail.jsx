import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const IconDetail = () => {
    return (
        <div className="flex justify-center items-center cursor-pointer shadow-sm bg-blue-500/20 aspect-square w-10 rounded-md">
            <FaMagnifyingGlass className="text-base text-blue-600" />
        </div>
    );
};

export default IconDetail;
