import React from "react";
import logo from "@/assets/images/logo.webp";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="w-20 h-20 border-4 border-t-primary border-gray-300 rounded-full animate-spin flex justify-center items-center">
                <div className="w-8 h-8">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-full h-full object-contain filter grayscale"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;
