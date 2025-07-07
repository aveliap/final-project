import TableCampaign from "@/components/dashboard/admin/TableCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllCampaignByStatus } from "@/redux/feature/admin/adminCampaignSlice";
import Loader from "@/components/Loader";
import InputSearch from "@/components/dashboard/InputSearch";
import Pagination from "@/components/Pagination";

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

const AdminCampaign = () => {
    const dispatch = useDispatch();
    const { campaigns, paging } = useSelector((state) => state.adminCampaign);

    const [filter, setFilter] = useState(data[0].name);
    const [isLoading, setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    useEffect(() => {
        const fetchAllCampaign = async () => {
            try {
                await dispatch(
                    getAllCampaignByStatus({
                        status: filter,
                        page: currentPage,
                        query: currentQuery,
                    })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchAllCampaign();
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (campaigns) {
            handleSearch("");
        }
    }, [filter]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSearch = async (query) => {
        try {
            setCurrentQuery(query);
            setIsloading(true);
            await dispatch(
                getAllCampaignByStatus({
                    query: query,
                    status: filter,
                    page: 0,
                })
            ).unwrap();
            setCurrentPage(0);
        } catch (error) {
            console.error("Error fetching : ", error);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <>
            <Title name={"Campaign"} />
            {campaigns !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    <InputSearch
                        name="campaign"
                        handleSearch={handleSearch}
                        filter={filter}
                    />

                    {!isLoading && (
                        <>
                            <TableCampaign />
                            {campaigns.length > 0 && (
                                <Pagination
                                    paging={paging}
                                    handlePageClick={handlePageClick}
                                />
                            )}
                        </>
                    )}
                    {isLoading && <Loader />}
                </>
            )}
            {campaigns === null && <Loader />}
        </>
    );
};

export default AdminCampaign;
