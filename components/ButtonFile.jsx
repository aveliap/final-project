import axiosInstance from "@/api/axios";
import React from "react";

const ButtonFile = (props) => {
    const { fileName, name } = props;

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
            onClick={handleClick}
            className="px-4 lg:px-8 py-3 border bg-light rounded-lg shadow-md cursor-pointer transition-template"
        >
            <h1 className="text-xs lg:text-base text-dark/85">{name}</h1>
        </div>
    );
};

export default ButtonFile;
