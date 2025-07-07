const CardCampaignSkleton = () => {
    return (
        <div className="flex flex-row border shadow-sm cursor-pointer p-3 w-full sm:w-[400px] lg:w-[500px] rounded-xl gap-4 animate-pulse">
            <div className="h-24 lg:h-40 aspect-square object-cover rounded-lg bg-accent/30"></div>
            <div className="flex flex-col w-full justify-between">
                <div className="h-6 w-full bg-accent/30 rounded-md"></div>

                <div className="lg:flex justify-between hidden">
                    <div className="h-6 w-[48%] bg-accent/30 rounded-md"></div>
                    <div className="h-6 w-[48%] bg-accent/30 rounded-md"></div>
                </div>

                <div className="h-6 w-full bg-accent/30 rounded-md"></div>
            </div>
        </div>
    );
};

export default CardCampaignSkleton;
