import AdminDetailWithdrawal from "@/components/dashboard/admin/AdminDetailWithdrawal";
import TableWithdrawal from "@/components/dashboard/admin/TableWithdrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawalByStatus } from "@/redux/feature/admin/adminWithdrawalSlice";
import Loader from "@/components/Loader";
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

const AdminWithdrawal = () => {
    const dispatch = useDispatch();

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [filter, setFilter] = useState(data[0].name);
    const [isLoading, setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    const { withdrawals, paging } = useSelector(
        (state) => state.adminWithdrawal
    );

    useEffect(() => {
        const fetch = async () => {
            try {
                await dispatch(
                    getAllWithdrawalByStatus({
                        status: filter,
                        page: currentPage,
                        query: currentQuery,
                    })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetch();
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (withdrawals) {
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
                getAllWithdrawalByStatus({
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

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Withdrawal"} />
            {withdrawals !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    <InputSearch
                        name="withdrawal"
                        handleSearch={handleSearch}
                        filter={filter}
                    />

                    {!isLoading && (
                        <>
                            <TableWithdrawal
                                handleDetailModal={handleDetailModal}
                            />
                            {withdrawals.length > 0 && (
                                <Pagination
                                    paging={paging}
                                    handlePageClick={handlePageClick}
                                />
                            )}
                        </>
                    )}

                    {isLoading && <Loader />}

                    <AdminDetailWithdrawal
                        isOpen={isDetailModalOpen}
                        closeModal={handleDetailModal}
                        status={filter}
                    />
                </>
            )}
            {withdrawals === null && <Loader />}
        </>
    );
};

export default AdminWithdrawal;
