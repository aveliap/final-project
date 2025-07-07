import ButtonFile from "@/components/ButtonFile";
import React from "react";
import { useSelector } from "react-redux";

const DocumentButtons = () => {
    const { partner } = useSelector((state) => state.partner);

    return (
        <div className="flex flex-row gap-2 flex-wrap items-center">
            <ButtonFile
                fileName={partner?.cfeFileName}
                name={"Certification of Foundation Establishment"}
            />
            <ButtonFile
                fileName={partner?.frFileName}
                name={"Financial Report"}
            />
            <ButtonFile
                fileName={partner?.rcFileName}
                name={"Registered Certificate"}
            />
            <ButtonFile
                fileName={partner?.ffpFileName}
                name={"Foundation Financial Plan"}
            />
            <ButtonFile fileName={partner?.baFileName} name={"Bank Account"} />
        </div>
    );
};

export default DocumentButtons;
