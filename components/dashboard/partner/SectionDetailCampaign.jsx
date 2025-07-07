import { capitalizeFirstLetter, formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NOT_FOUND from "@/assets/images/NotFound.jpg";
import {
    clearCurrentCampaignUrl,
    getCampaignImageByName,
} from "@/redux/feature/partner/campaignSlice";
import Loader from "@/components/Loader";

const SectionDetailCampaign = () => {
    const dispatch = useDispatch();

    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );

    useEffect(() => {
        fetchData();
    }, [dispatch, currentCampaign]);

    const fetchData = async () => {
        try {
            dispatch(clearCurrentCampaignUrl());
            if (currentCampaign) {
                await dispatch(
                    getCampaignImageByName(currentCampaign.campaignImageName)
                ).unwrap();
            }
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <div className="flex flex-wrap h-max gap-4 text-dark/85">
            <div className="w-[44%]">
                <div className="w-full aspect-video border h-full max-h-[500px] rounded-md overflow-hidden shadow-sm">
                    {currentCampaignUrl === null ? (
                        <div className="w-full h-full bg-light flex justify-center items-center">
                            <Loader />
                        </div>
                    ) : (
                        <img
                            src={currentCampaignUrl}
                            alt="Campaign Image"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = NOT_FOUND)}
                        />
                    )}
                </div>
            </div>

            <div className="flex flex-col w-[54%]">
                <h1 className="text-4xl mb-8 capitalize">
                    {currentCampaign.title}
                </h1>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Raised Amount</h1>
                        <h1 className="text-lg font-medium">
                            <FormatRupiah
                                value={currentCampaign.currentAmount}
                            />
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">Goal Amount</h1>
                        <h1 className="text-lg font-medium">
                            <FormatRupiah value={currentCampaign.goalAmount} />
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Start Data</h1>
                        <h1 className="text-lg font-medium">
                            {formatDate(currentCampaign.startDate)}
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">End Date</h1>
                        <h1 className="text-lg font-medium">
                            {formatDate(currentCampaign.endDate)}
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Category</h1>
                        <h1 className="text-lg font-medium">
                            {currentCampaign.category}
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">Status</h1>
                        <h1 className="text-lg font-medium">
                            {capitalizeFirstLetter(currentCampaign.status)}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="font-light">Description</h1>
                    <h1 className="text-lg font-medium break-words">
                        {currentCampaign.description}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default SectionDetailCampaign;
