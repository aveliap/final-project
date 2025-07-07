import Pagination from "@/components/Pagination";
import { getDonationByDonorId } from "@/redux/feature/admin/adminDonationSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminCardDonation from "./AdminCardDonation";
import dummy from "@/data/dummyDonation.json";
import CustomModal from "@/components/CustomModal";

const SectionListDonation = () => {
    const dispatch = useDispatch();

    const { currentDonor } = useSelector((state) => state.adminDonor);
    const { donations, paging } = useSelector((state) => state.adminDonation);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (currentDonor) {
            fetchData();
        }
    }, [dispatch, currentDonor, currentPage]);

    const fetchData = async () => {
        try {
            await dispatch(
                getDonationByDonorId({ id: currentDonor.id, page: currentPage })
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
            <h1 className="text-dark/85 text-3xl mb-8 mt-10">List Donation</h1>
            {donations && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-4">
                        {donations.length > 0 && (
                            <>
                                <EachUtils
                                    of={donations}
                                    render={(item) => (
                                        <AdminCardDonation item={item} />
                                    )}
                                />
                            </>
                        )}
                    </div>
                    {donations.length > 0 ? (
                        <Pagination
                            paging={paging}
                            handlePageClick={handlePageClick}
                        />
                    ) : (
                        <div className="flex justify-center items-center py-20 w-full">
                            <h1 className="text-xl">Donation not found</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default SectionListDonation;
