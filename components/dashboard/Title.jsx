import React from "react";

const Title = ({ name, children }) => {
    return (
        <div className="w-full py-2 mb-10 border-b border-black/70 flex justify-between items-center">
            <h1 className="text-xl md:text-4xl font-medium text-dark/80">
                {name}
            </h1>
            {children}
        </div>
    );
};

export default Title;
