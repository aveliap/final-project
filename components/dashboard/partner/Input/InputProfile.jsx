import React from "react";

const InputProfile = (props) => {
    const {
        title,
        name,
        type,
        updatedPartner,
        handleChangeInput,
        isEdit,
        isEmailInvalid,
    } = props;

    const commonProps = {
        value: updatedPartner?.[name] || "",
        id: name,
        autoComplete: "off",
        onInput: handleChangeInput,
        disabled: name === "email" ? true : !isEdit,
        name: name,
        className: `px-5 py-4 outline-none rounded-md border no-arrow focus:shadow-sm bg-white 
        ${
            name !== "email" &&
            (!isEdit ? "text-black/40 cursor-not-allowed" : "text-black/80")
        }
        ${name === "email" && "text-black/40 cursor-not-allowed"}
        `,
    };

    return (
        <div
            className={`flex flex-col gap-1 w-full  ${
                name !== "description" && "2xl:w-[48%]"
            }`}
        >
            <div className="flex justify-between items-center">
                <label htmlFor={name} className="text-black/80">
                    {title}
                </label>
                {isEmailInvalid && name === "email" && (
                    <p className="text-xs font-medium text-error">
                        *Invalid format email
                    </p>
                )}
            </div>
            {name === "description" && (
                <textarea
                    {...commonProps}
                    placeholder="Enter description for your foundation"
                    maxLength={255}
                    className={`${commonProps.className} h-40 w-full lg:h-28 resize-none`}
                />
            )}

            {name !== "description" && (
                <input
                    {...commonProps}
                    type={type}
                    required
                    placeholder="Enter your foundation name"
                />
            )}
        </div>
    );
};

export default InputProfile;
