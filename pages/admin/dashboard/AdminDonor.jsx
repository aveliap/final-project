import TableDonor from "@/components/dashboard/admin/TableDonor";
import InputSearch from "@/components/dashboard/InputSearch";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { getAllDonor } from "@/redux/feature/admin/adminDonorSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDonor = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    const { donors, paging } = useSelector((state) => state.adminDonor);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                await dispatch(
                    getAllDonor({
                        page: currentPage,
                        query: currentQuery,
                    })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchAll();
    }, [dispatch, currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSearch = async (query) => {
        try {
            setCurrentQuery(query);
            setIsloading(true);
            await dispatch(
                getAllDonor({
                    query: query,
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
            <Title name={"Donor"} />
            {donors && (
                <>
                    <InputSearch name="donor" handleSearch={handleSearch} />
                    {!isLoading && (
                        <>
                            {donors.length > 0 && (
                                <>
                                    <TableDonor />
                                    <Pagination
                                        paging={paging}
                                        handlePageClick={handlePageClick}
                                    />
                                </>
                            )}
                        </>
                    )}
                    {isLoading && <Loader />}
                </>
            )}
            {donors === null && <Loader />}
        </>
    );
};

export default AdminDonor;
