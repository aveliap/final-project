import Button from "@/components/Button";
import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { Failed } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCampaignByPartnerId } from "@/redux/feature/partner/campaignSlice";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import InputSearch from "@/components/dashboard/InputSearch";

const data = [
    {
        name: "IN_REVIEW",
    },
    {
        name: "ACTIVE",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const Campaign = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { campaigns, paging } = useSelector((state) => state.campaign);

    const [filter, setFilter] = useState(data[0].name);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    useEffect(() => {
        if (user?.id) {
            fetchCampaignData();
        }
    }, [user, filter, currentPage, currentQuery]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSearch = async (query) => {
        setCurrentQuery(query);
        setIsLoading(true);
        try {
            await dispatch(
                getCampaignByPartnerId({
                    id: user.id,
                    status: filter,
                    page: 0,
                    query: query,
                })
            ).unwrap();
            setCurrentPage(0);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCampaignData = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
            await dispatch(
                getCampaignByPartnerId({
                    id: user.id,
                    status: filter,
                    page: currentPage,
                    query: currentQuery,
                })
            ).unwrap();
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    const handleFromModal = () => {
        if (partner?.status !== "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Campaign"}>
                <div className="pb-2">
                    <Button
                        type={"button"}
                        name={"Add"}
                        onClick={handleFromModal}
                    />
                </div>
            </Title>

            <FormCampaign
                isOpen={isFormModalOpen}
                closeModal={handleFromModal}
                filter={filter}
            />

            {campaigns && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    <InputSearch
                        name="campaign"
                        handleSearch={handleSearch}
                        filter={filter}
                    />

                    {!isLoading && (
                        <>
                            {campaigns?.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 grid-rows-subgrid gap-4">
                                        <EachUtils
                                            of={campaigns}
                                            render={(item) => (
                                                <CardCampaign
                                                    item={item}
                                                    status={filter}
                                                />
                                            )}
                                        />
                                    </div>
                                    <Pagination
                                        paging={paging}
                                        handlePageClick={handlePageClick}
                                    />
                                </>
                            ) : (
                                <div className="flex text-black justify-center items-center h-[50vh]">
                                    <h1>Campaign Not Found</h1>
                                </div>
                            )}
                        </>
                    )}

                    {isLoading && <Loader />}
                </>
            )}
            {!campaigns && <Loader />}
        </>
    );
};

export default Campaign;
