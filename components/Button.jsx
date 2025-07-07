import React from "react";

const Button = ({
    type = "button",
    name,
    onClick = null,
    disabled = false,
}) => {
    const submit = `bg-primary hover:bg-emerald-600 ${
        disabled && "hover:bg-primary cursor-not-allowed"
    }`;
    const reset = "bg-rose-500 hover:bg-rose-600";
    const button = "bg-blue-500 hover:bg-blue-600";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`w-full lg:w-max lg:min-w-28 lg:py-2 lg:px-5 py-1 px-3 text-sm lg:text-lg rounded-md shadow-sm text-light font-medium outline-none 
                ${type === "submit" && submit}
                ${type === "reset" && reset}
                ${type === "button" && button}
                `}
        >
            {name}
        </button>
    );
};

export default Button;
