import axiosInstance from "@/api/axios";
import CardCampaignSkleton from "@/components/Skleton/CardCampaignSkleton";
import { formatDate, limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NOT_FOUND from "@/assets/images/NotFound.jpg";

const CardCampaign = (props) => {
    const { item, status } = props;

    const [imageUrl, setImageUrl] = useState("");
    const percent = (item.currentAmount / item.goalAmount) * 100;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/file/${item.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageUrl();
    }, [item.campaignImageName]);

    return !isLoading ? (
        <Link
            to={`/dashboard/partner/campaign/${item.id}`}
            className="flex flex-row border bg-light hover:border-primary transition-template shadow-sm cursor-pointer p-3 w-full max-w-[540px] rounded-xl gap-4"
        >
            <img
                src={imageUrl}
                alt="Image Campaign"
                onError={(e) => (e.target.src = NOT_FOUND)}
                className="h-24 hidden lg:flex lg:h-40 aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col w-full justify-between gap-4 lg:gap-0">
                <h1 className="text-sm lg:text-lg  text-dark">
                    {limitText(item.title, 50)}
                </h1>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xs text-dark">Start date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(item.startDate)}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-xs text-dark">End date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(item.endDate)}
                        </h1>
                    </div>
                </div>

                {status === "ACTIVE" && (
                    <div className="hidden lg:block">
                        <div className="flex justify-between items-end text-xs text-dark/80">
                            <h1>
                                <FormatRupiah value={item.currentAmount} />
                            </h1>
                            <h1>
                                <FormatRupiah value={item.goalAmount} />
                            </h1>
                        </div>
                        <div className="w-full h-1 lg:h-3 rounded-full overflow-hidden bg-primary/20 ">
                            <div
                                style={{ width: `${percent}%` }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>
                    </div>
                )}

                {(status === "IN_REVIEW" || status === "REJECTED") && (
                    <div className="lg:block justify-between items-end hidden">
                        <div>
                            <h1 className="text-xs text-dark">Goal amount</h1>
                            <h1 className="text-primary text-xs font-medium">
                                <FormatRupiah value={item.goalAmount} />
                            </h1>
                        </div>
                    </div>
                )}

                {status === "COMPLETED" && (
                    <div className="lg:block justify-between items-end hidden">
                        <h1 className="text-xs text-dark">Raise amount</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={item.currentAmount} />
                        </h1>
                    </div>
                )}
            </div>
        </Link>
    ) : (
        <CardCampaignSkleton />
    );
};

export default CardCampaign;
