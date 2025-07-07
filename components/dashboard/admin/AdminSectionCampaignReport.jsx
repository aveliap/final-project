import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/Pagination";
import EachUtils from "@/utils/EachUtils";
import { getCampaignReportByCampaignId } from "@/redux/feature/partner/campaignReportSlice";
import CardCampaignReport from "../partner/CardCampaignReport";

const AdminSectionCampaignReport = () => {
    const dispatch = useDispatch();

    const { campaignReports, paging } = useSelector(
        (state) => state.campaignReport
    );

    const { currentCampaign } = useSelector((state) => state.campaign);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchData();
    }, [dispatch, currentPage, campaignReports]);

    const fetchData = async () => {
        try {
            if (currentCampaign) {
                await dispatch(
                    getCampaignReportByCampaignId({
                        id: currentCampaign.id,
                        page: currentPage,
                        size: 5,
                    })
                ).unwrap();
            }
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        campaignReports && (
            <>
                <div>
                    <h1 className="text-dark/85 text-3xl mb-8">
                        Campaign Report
                    </h1>
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="px-4 py-6 rounded-xl border flex flex-col w-full gap-4 h-max bg-white">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
                                <EachUtils
                                    of={campaignReports}
                                    render={(item) => (
                                        <CardCampaignReport item={item} />
                                    )}
                                />
                            </div>

                            {campaignReports.length == 0 ? (
                                <div className="flex justify-center items-center py-20 w-full">
                                    <h1 className="text-xl">
                                        Campaign reports not found
                                    </h1>
                                </div>
                            ) : (
                                <Pagination
                                    paging={paging}
                                    handlePageClick={handlePageClick}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default AdminSectionCampaignReport;
