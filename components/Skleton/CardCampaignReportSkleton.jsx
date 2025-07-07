import React from "react";

const CardCampaignReportSkleton = () => {
    return (
        <div className="w-full max-w-xs animate-pulse rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
            <div className="w-full h-40 bg-accent/30"></div>
            <div className="p-2 pb-3 h-[120px] gap-2 flex flex-col">
                <h1 className="text-dark text-sm w-full h-3 rounded-full bg-accent/30"></h1>
                <h1 className="text-dark text-sm w-full h-3 rounded-full bg-accent/30"></h1>
                <h1 className="text-dark text-sm w-full h-3 rounded-full bg-accent/30"></h1>
                <h1 className="text-dark text-sm w-full h-3 rounded-full bg-accent/30"></h1>
                <h1 className="text-dark text-sm w-full h-3 rounded-full bg-accent/30"></h1>
            </div>
        </div>
    );
};

export default CardCampaignReportSkleton;
