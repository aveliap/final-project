import axiosInstance from "@/api/axios";
import React from "react";
import { FaRegMessage } from "react-icons/fa6";

const IconMessage = (props) => {
    const { fileName, type } = props;
    const handleClick = async () => {
        try {
            const response = await axiosInstance.get(`/file/${fileName}`);
            window.open(response.data, "_blank");
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    return (
        <div
            onClick={() => type === "invoice" && handleClick()}
            className="flex justify-center items-center cursor-pointer shadow-sm bg-emerald-500/20 aspect-square w-10 rounded-md"
        >
            <FaRegMessage className="text-base text-emerald-600" />
        </div>
    );
};

export default IconMessage;
