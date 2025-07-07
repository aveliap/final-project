import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import CardWithdrawal from "@/components/dashboard/partner/CardWithDrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";

import { getWithdrawalByPartnerId } from "@/redux/feature/partner/withdrawalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";
import InputSearch from "@/components/dashboard/InputSearch";
import Pagination from "@/components/Pagination";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "APPROVED",
    },
    {
        name: "REJECTED",
    },
];

const Withdrawal = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { withdrawals, paging } = useSelector((state) => state.withdrawal);

    const [filter, setFilter] = useState(data[0].name);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    useEffect(() => {
        if (user?.id) {
            fetch();
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
                getWithdrawalByPartnerId({
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

    const fetch = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
            await dispatch(
                getWithdrawalByPartnerId({
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

    return (
        <>
            <Title name={"Withdrawal"} />
            {partner && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    <InputSearch
                        name="withdrawal"
                        handleSearch={handleSearch}
                        filter={filter}
                    />

                    {!isLoading && (
                        <>
                            {withdrawals?.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 grid-rows-subgrid gap-4">
                                        <EachUtils
                                            of={withdrawals}
                                            render={(item) => (
                                                <CardWithdrawal
                                                    withdrawal={item}
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
                                    <h1>Withdrawal Not Found</h1>
                                </div>
                            )}
                        </>
                    )}
                    {isLoading && <Loader />}
                </>
            )}
            {!partner && <Loader />}
        </>
    );
};

export default Withdrawal;
