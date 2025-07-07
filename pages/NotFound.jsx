import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center w-full h-screen bg-light">
            <h1 className="text-6xl text-primary font-semibold">
                404 Not Found
            </h1>
            <h1 className="text-2xl font-medium text-dark/70">
                Whoops! That page doesn't exist.
            </h1>
        </div>
    );
};

export default NotFound;
