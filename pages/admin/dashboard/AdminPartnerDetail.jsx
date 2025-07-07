import Button from "@/components/Button";
import ButtonFile from "@/components/ButtonFile";
import SectionListCampaign from "@/components/dashboard/admin/SectionListCampaign";
import Title from "@/components/dashboard/Title";
import { getCampaignByPartnerId } from "@/redux/feature/admin/adminCampaignSlice";
import {
    approvePartner,
    getDetailPartner,
    rejectPartner,
} from "@/redux/feature/admin/adminPartnerSlice";
import { Confirm, Failed, InputMessage, Success } from "@/utils/AlertUtil";
import { capitalizeFirstLetter, formatPhoneNumber } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AdminPartnerDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { currentPartner } = useSelector((state) => state.adminPartner);
    const { paging } = useSelector((state) => state.adminCampaign);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [slug, dispatch]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            await dispatch(getDetailPartner(slug)).unwrap();
            await dispatch(getCampaignByPartnerId({ id: slug })).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = () => {
        Confirm("Approved a partner", async () => {
            try {
                await dispatch(approvePartner(currentPartner.id)).unwrap();
                Success("Successfully approved a new partner");
                await dispatch(getDetailPartner(slug)).unwrap();
            } catch (error) {
                console.log(error);
                Failed("Failed approved a partner");
            }
        });
    };

    const handleReject = () => {
        Confirm("Rejected a partner", () => {
            InputMessage(async (message) => {
                try {
                    const data = new FormData();
                    data.append("message", message);
                    await dispatch(
                        rejectPartner({ id: currentPartner.id, data })
                    ).unwrap();
                    Success("Successfully rejected a partner");
                    await dispatch(getDetailPartner(slug)).unwrap();
                } catch (error) {
                    console.log(error);
                    Failed("Failed rejected a partner");
                }
            });
        });
    };

    return (
        <>
            {!isLoading && (
                <>
                    <Title name={"Detail Partner"}>
                        {currentPartner.status === "IN_REVIEW" && (
                            <div className="flex gap-4 pb-2">
                                <Button
                                    type="submit"
                                    name={"Approve Partner"}
                                    onClick={handleApprove}
                                />
                                <Button
                                    type="reset"
                                    name={"Reject Partner"}
                                    onClick={handleReject}
                                />
                            </div>
                        )}
                    </Title>
                    <div className="flex flex-col w-full text-dark/85 mb-10">
                        <h1 className="text-4xl mb-8 capitalize">
                            {currentPartner.title}
                        </h1>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Foundation Name</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.name}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-light">Email</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.email}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Address</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.address || "-"}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-light">Status</h1>
                                <h1 className="text-lg font-medium">
                                    {capitalizeFirstLetter(
                                        currentPartner.status
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Contact</h1>
                                <h1 className="text-lg font-medium">
                                    {formatPhoneNumber(
                                        currentPartner.phoneNumber
                                    )}
                                </h1>
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Total Campaign</h1>
                                <h1 className="text-lg font-medium">
                                    {paging.totalElements}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-light">Description</h1>
                            <h1 className="text-lg font-medium break-words">
                                {currentPartner.description || "-"}
                            </h1>
                        </div>
                    </div>
                    {(currentPartner.status === "IN_REVIEW" ||
                        currentPartner.status === "VERIFIED") && (
                        <>
                            <div className="mt-8">
                                <h1 className="text-dark/70 mb-2">Document</h1>
                                <div className="flex flex-row gap-2 flex-wrap items-center">
                                    <ButtonFile
                                        fileName={currentPartner?.cfeFileName}
                                        name={
                                            "Certification of Foundation Estabishment"
                                        }
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.frFileName}
                                        name={"Financial Report"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.rcFileName}
                                        name={"Registered Certificate"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.ffpFileName}
                                        name={"Foundation Financial Plan"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.baFileName}
                                        name={"Bank Account"}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <SectionListCampaign />
                </>
            )}
        </>
    );
};

export default AdminPartnerDetail;
