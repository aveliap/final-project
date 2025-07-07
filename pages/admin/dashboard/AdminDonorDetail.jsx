import Title from "@/components/dashboard/Title";
import {
    clearCurrentDonorUrl,
    getDonorById,
    getDonorImageByName,
} from "@/redux/feature/admin/adminDonorSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/Utils";
import NOT_FOUND from "@/assets/images/NotFound.jpg";
import SectionDonorDetail from "@/components/dashboard/admin/SectionDonorDetail";
import SectionListDonation from "@/components/dashboard/admin/SectionListDonation";

const AdminDonorDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentDonor, currentDonorUrl } = useSelector(
        (state) => state.adminDonor
    );

    useEffect(() => {
        fetchData();
    }, [id, currentDonor?.imageName]);

    const fetchData = async () => {
        try {
            await dispatch(getDonorById(id)).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <>
            {currentDonor && (
                <>
                    <Title name={"Detail Donor"} />
                    <SectionDonorDetail />

                    <SectionListDonation />
                </>
            )}

            {!currentDonor && (
                <div className="flex text-dark/80 justify-center items-center h-[80vh]">
                    <h1 className="text-lg font-medium">Donor not found</h1>
                </div>
            )}
        </>
    );
};

export default AdminDonorDetail;
