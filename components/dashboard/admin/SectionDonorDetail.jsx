import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NOT_FOUND from "@/assets/images/NotFound.jpg";
import { formatPhoneNumber } from "@/utils/Utils";
import { getDonationByDonorId } from "@/redux/feature/admin/adminDonationSlice";
import {
    clearCurrentDonorUrl,
    getDonorImageByName,
} from "@/redux/feature/admin/adminDonorSlice";

const SectionDonorDetail = () => {
    const { currentDonor, currentDonorUrl } = useSelector(
        (state) => state.adminDonor
    );

    const dispatch = useDispatch();
    const { donations, paging } = useSelector((state) => state.adminDonation);

    useEffect(() => {
        if (currentDonor) {
            fetchData();
        }
    }, [dispatch, currentDonor]);

    const fetchData = async () => {
        try {
            dispatch(clearCurrentDonorUrl());

            await dispatch(
                getDonationByDonorId({ id: currentDonor.id })
            ).unwrap();

            await dispatch(
                getDonorImageByName(currentDonor.imageName)
            ).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <>
            <div className="mb-6">
                <div className="w-52 aspect-square border rounded-full overflow-hidden shadow-sm">
                    <img
                        src={currentDonorUrl || ""}
                        alt="Campaign Image"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = NOT_FOUND)}
                    />
                </div>
            </div>

            <div className="flex flex-col w-full text-dark/85 mb-10">
                <div className="flex mb-8 items-center">
                    <div className="lg:w-2/5">
                        <h1 className="font-light">Name</h1>
                        <h1 className="text-lg font-medium">
                            {currentDonor.name}
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">Email</h1>
                        <h1 className="text-lg font-medium">
                            {currentDonor.email}
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-2/5">
                        <h1 className="font-light">Phone Number</h1>
                        <h1 className="text-lg font-medium">
                            {formatPhoneNumber(currentDonor.phone)}
                        </h1>
                    </div>
                    <div className="lg:w-2/5">
                        <h1 className="font-light">Total Donation</h1>
                        <h1 className="text-lg font-medium">
                            {paging.totalElements}
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-2/5">
                        <h1 className="font-light">Total Point</h1>
                        <h1 className="text-lg font-medium">
                            {currentDonor.totalPoints}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionDonorDetail;
