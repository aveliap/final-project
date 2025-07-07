import { Message } from "@/utils/AlertUtil";
import React from "react";
import { useSelector } from "react-redux";

const StatusMessage = () => {
    const { partner } = useSelector((state) => state.partner);

    const handleClickMessage = () => {
        Message(partner.message);
    };

    if (partner.status === "VERIFIED") {
        return (
            <h1 className="text-dark mb-4 text-xs lg:text-lg">
                Your foundation has been successfully verified
            </h1>
        );
    }
    if (partner.status === "IN_REVIEW") {
        return (
            <h1 className="text-dark mb-4 text-xs lg:text-lg">
                You have submitted a verification request, please wait for
                approval
            </h1>
        );
    }
    if (partner.status === "REJECTED") {
        return (
            <div className="flex mb-4 items-end ">
                <h1 className="text-xs text-dark lg:text-lg">
                    Please correct the document according to the{" "}
                    <span
                        onClick={handleClickMessage}
                        className="underline cursor-pointer text-primary font-semibold"
                    >
                        this message
                    </span>
                </h1>
            </div>
        );
    }
    return null;
};

export default StatusMessage;
