import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCampaignDetailById,
    getCampaignImageByName,
    stopCampaignById,
} from "@/redux/feature/partner/campaignSlice";

import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { Confirm, Failed, Message, Success } from "@/utils/AlertUtil";
import SectionDetailCampaign from "@/components/dashboard/partner/SectionDetailCampaign";
import {
    createWithdrawal,
    updateWithdrawal,
} from "@/redux/feature/partner/withdrawalSlice";
import { pdf } from "@react-pdf/renderer";
import Invoice from "@/components/PDF/Invoice";
import FormEditCampaign from "@/components/dashboard/partner/FormEditCampaign";
import { FaInfo } from "react-icons/fa6";
import SectionDonationCampaign from "@/components/dashboard/partner/SectionDonationCampaign";
import SectionCampaignReport from "@/components/dashboard/partner/SectionCampaignReport";

const CampaignDetail = () => {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);
    const { partner } = useSelector((state) => state.partner);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [slug, dispatch, currentCampaign?.campaignImageName]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            await dispatch(getCampaignDetailById(slug)).unwrap();
            if (currentCampaign) {
                await dispatch(
                    getCampaignImageByName(currentCampaign.campaignImageName)
                ).unwrap();
            }
        } catch (error) {
            console.log("Erorr : ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen((state) => !state);
    };

    const showMessage = () => {
        Message(currentCampaign.message, "info");
    };

    const requestWithdrawal = () => {
        const { status, isWithdrawal } = currentCampaign;

        if (status !== "COMPLETED") {
            return Failed("Only campaigns that have been completed");
        }

        if (status === "COMPLETED" && isWithdrawal === "PENDING") {
            return Failed("You already request a withdrawal");
        }

        if (status === "COMPLETED" && isWithdrawal === "APPROVED") {
            return Failed("Withdrawal campaign already approved");
        }

        Confirm("Request a withdrawal", async () => {
            try {
                const totalTax = currentCampaign.currentAmount * (3 / 100);
                const totalAmount = currentCampaign.currentAmount - totalTax;

                const data = new FormData();
                data.append("totalTax", totalTax);
                data.append("totalAmount", totalAmount);
                data.append("campaignId", currentCampaign.id);

                if (isWithdrawal === "REJECTED") {
                    await dispatch(
                        updateWithdrawal(currentCampaign.id)
                    ).unwrap();
                }

                if (isWithdrawal == null) {
                    await dispatch(createWithdrawal(data)).unwrap();
                }

                const blob = await pdf(
                    <Invoice item={currentCampaign} parter={partner} />
                ).toBlob();

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "withdrawal_invoice.pdf");
                document.body.appendChild(link);
                link.click();
                link.remove();

                await fetchData();
                Success("Successfully request withdrawal");
            } catch (error) {
                console.log(error);
                return Failed("Failed request withdrawal");
            }
        });
    };

    const stopCampaign = () => {
        Confirm("Stop the campaign", async () => {
            try {
                await dispatch(stopCampaignById(currentCampaign.id)).unwrap();
                await fetchData();
                Success("Successfully stop campaign");
            } catch (error) {
                return Failed("Failed stop campaign");
            }
        });
    };

    return (
        <>
            {!isLoading && (
                <>
                    <Title name={"Detail Campaign"}>
                        <div className="flex gap-3 pb-2">
                            <div
                                onClick={showMessage}
                                className="flex justify-center items-center cursor-pointer shadow-sm bg-primary/20 aspect-square w-12 rounded-md"
                            >
                                <FaInfo className="text-xl text-emerald-600" />
                            </div>
                            {currentCampaign.status === "COMPLETED" && (
                                <Button
                                    type="submit"
                                    name={"Request a withdrawal"}
                                    onClick={requestWithdrawal}
                                />
                            )}
                            {currentCampaign.status === "ACTIVE" && (
                                <>
                                    <Button
                                        type="button"
                                        name={"Edit campaign"}
                                        onClick={handleModalOpen}
                                    />
                                    <Button
                                        type="reset"
                                        name={"Stop campaign"}
                                        onClick={stopCampaign}
                                    />
                                </>
                            )}
                        </div>
                    </Title>

                    <FormEditCampaign
                        isOpen={isModalOpen}
                        closeModal={handleModalOpen}
                    />

                    <div className="flex flex-col gap-14 pb-10">
                        <SectionDetailCampaign />

                        <SectionCampaignReport />

                        <SectionDonationCampaign />
                    </div>
                </>
            )}
            {isLoading && <Loader />}
        </>
    );
};

export default CampaignDetail;
