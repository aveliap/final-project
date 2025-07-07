import { getCampaignByPartnerId } from "@/redux/feature/partner/campaignSlice";
import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter, formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminCardCampaign from "./AdminCardCampaign";
import Pagination from "@/components/Pagination";

const SectionListCampaign = () => {
    const dispatch = useDispatch();
    const { currentPartner } = useSelector((state) => state.adminPartner);
    const { currentCampaign, paging } = useSelector(
        (state) => state.adminCampaign
    );
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (currentPartner) {
            fetchData();
        }
    }, [dispatch, currentPartner, currentPage]);

    const fetchData = async () => {
        try {
            await dispatch(
                getCampaignByPartnerId({
                    id: currentPartner.id,
                    page: currentPage,
                    size: 12,
                })
            ).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <>
            <h1 className="text-dark/85 text-3xl mb-8 mt-10">List Campaign</h1>
            {currentCampaign && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-4">
                        {currentCampaign.length > 0 && (
                            <>
                                <EachUtils
                                    of={currentCampaign}
                                    render={(item) => (
                                        <AdminCardCampaign item={item} />
                                    )}
                                />
                            </>
                        )}
                    </div>
                    {currentCampaign.length > 0 ? (
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
        </>
    );
};

export default SectionListCampaign;
