import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCampaignDetailById,
    getCampaignImageByName,
} from "@/redux/feature/partner/campaignSlice";

import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { Confirm, Failed, InputMessage, Success } from "@/utils/AlertUtil";
import SectionDetailCampaign from "@/components/dashboard/partner/SectionDetailCampaign";
import {
    approveCampaign,
    rejectCampaign,
} from "@/redux/feature/admin/adminCampaignSlice";
import AdminSectionCampaignReport from "@/components/dashboard/admin/AdminSectionCampaignReport";
import SectionDonationCampaign from "@/components/dashboard/partner/SectionDonationCampaign";

const AdminCampaignDetail = () => {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);

    useEffect(() => {
        fetchData();
    }, [slug, dispatch, currentCampaign?.campaignImageName]);

    const fetchData = async () => {
        try {
            await dispatch(getCampaignDetailById(slug)).unwrap();
            if (currentCampaign) {
                await dispatch(
                    getCampaignImageByName(currentCampaign.campaignImageName)
                ).unwrap();
            }
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    const approve = () => {
        const { status } = currentCampaign;

        if (status === "ACTIVE") {
            return Failed("Campaign is already approved");
        }

        if (status === "REJECTED") {
            return Failed("Campaign is already rejected");
        }

        if (status === "COMPLETED") {
            return Failed("Campaign is already completed");
        }

        Confirm("Approved a campaign", async () => {
            try {
                await dispatch(approveCampaign(currentCampaign.id)).unwrap();
                await fetchData();
                Success("Successfully approved a new campaign");
            } catch (error) {
                Failed("Failed approved a campaign");
            }
        });
    };

    const reject = () => {
        const { status } = currentCampaign;

        if (status === "ACTIVE") {
            return Failed("Campaign is already approved");
        }

        if (status === "REJECTED") {
            return Failed("Campaign is already rejected");
        }

        if (status === "COMPLETED") {
            return Failed("Campaign is already completed");
        }

        Confirm("Rejected a campaign", () => {
            InputMessage(async (message) => {
                try {
                    const data = new FormData();
                    data.append("message", message);
                    await dispatch(
                        rejectCampaign({ id: currentCampaign.id, data })
                    ).unwrap();
                    await fetchData();
                    Success("Successfully rejected a campaign");
                } catch (error) {
                    console.log(error);
                    Failed("Failed rejected a campaign");
                }
            });
        });
    };

    return (
        <>
            {currentCampaign && (
                <>
                    <Title name={"Detail Campaign"}>
                        {currentCampaign.status === "IN_REVIEW" && (
                            <div className="flex gap-4 pb-2">
                                <Button
                                    type="submit"
                                    name={"Approve Campaign"}
                                    onClick={approve}
                                />
                                <Button
                                    type="reset"
                                    name={"Reject Campaign"}
                                    onClick={reject}
                                />
                            </div>
                        )}
                    </Title>

                    <>
                        <div className="flex flex-col gap-14 pb-10">
                            <SectionDetailCampaign />

                            {/* Section Report */}
                            <AdminSectionCampaignReport />

                            <SectionDonationCampaign />
                        </div>
                    </>
                </>
            )}
            {!currentCampaign && <Loader />}
        </>
    );
};

export default AdminCampaignDetail;
