import Pagination from "@/components/Pagination";
import { getDonationByCampaignId } from "@/redux/feature/partner/donationSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardDonation from "./CardDonation";

const SectionDonationCampaign = () => {
    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);
    const { donations, paging } = useSelector((state) => state.donation);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (donations) {
            console.log(donations);
        }

        if (currentCampaign) {
            const fetchDonation = async () => {
                try {
                    await dispatch(
                        getDonationByCampaignId({
                            id: currentCampaign.id,
                            page: currentPage,
                        })
                    ).unwrap();
                } catch (error) {
                    console.log("Error : ", error);
                }
            };

            fetchDonation();
        }
    }, [currentCampaign, currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <h1 className="text-dark/85 text-3xl mb-8">Campaign Donation</h1>

            {donations && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-4">
                        {donations.length > 0 && (
                            <EachUtils
                                of={donations}
                                render={(item) => <CardDonation item={item} />}
                            />
                        )}
                    </div>
                    {donations.length > 0 ? (
                        <Pagination
                            paging={paging}
                            handlePageClick={handlePageClick}
                        />
                    ) : (
                        <div className="flex justify-center items-center py-20 w-full">
                            <h1 className="text-xl">
                                Campaign donation not found
                            </h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SectionDonationCampaign;
