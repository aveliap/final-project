import CardWithChart from "@/components/dashboard/admin/CardWithChart";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import { getPartnerReport } from "@/redux/feature/partner/partnerReportSlice";
import EachUtils from "@/utils/EachUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@/data/dataDashboard.json";
import { IoPersonOutline, IoWalletOutline } from "react-icons/io5";
import CardBasic from "@/components/dashboard/admin/CardBasic";
import { limitText } from "@/utils/Utils";
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import TableDisplay from "@/components/dashboard/admin/TableDisplay";
import { getCampaignByPartnerId } from "@/redux/feature/admin/adminCampaignSlice";
import { getWithdrawalByPartnerId } from "@/redux/feature/partner/withdrawalSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { report } = useSelector((state) => state.partnerReport);
    const { user } = useSelector((state) => state.auth);

    const { campaigns } = useSelector((state) => state.campaign);
    const { withdrawals } = useSelector((state) => state.withdrawal);

    const [datas, setDatas] = useState(data);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                await dispatch(getPartnerReport(user.id)).unwrap();
                await dispatch(
                    getCampaignByPartnerId({ id: user.id, size: 3 })
                ).unwrap();
                await dispatch(
                    getWithdrawalByPartnerId({ id: user.id, size: 3 })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        if (report === null) return;
        const updatedDatas = datas.map((item) => {
            const {
                totalCampaignInReview,
                totalCampaignActive,
                totalCampaignCompleted,
                totalCampaignRejected,
                totalWithdrawalApproved,
                totalWithdrawalPending,
                totalWithdrawalReject,
            } = report;
            switch (item.name) {
                case "Campaigns":
                    return {
                        ...item,
                        data:
                            totalCampaignInReview +
                            totalCampaignActive +
                            totalCampaignCompleted +
                            totalCampaignRejected,
                        dataChart: {
                            labels: [
                                "In Review",
                                "Active",
                                "Completed",
                                "Rejected",
                            ],
                            datasets: [
                                {
                                    data: [
                                        totalCampaignInReview,
                                        totalCampaignActive,
                                        totalCampaignCompleted,
                                        totalCampaignRejected,
                                    ],
                                    backgroundColor: [
                                        "#F43F5E",
                                        "#FB7185",
                                        "#FDA4AF",
                                        "#FECDD3",
                                    ],
                                },
                            ],
                        },
                    };
                case "Withdrawals":
                    return {
                        ...item,
                        data:
                            totalWithdrawalPending +
                            totalWithdrawalApproved +
                            totalWithdrawalReject,
                        dataChart: {
                            labels: ["Pending", "Aproved", "Rejected"],
                            datasets: [
                                {
                                    data: [
                                        totalWithdrawalPending,
                                        totalWithdrawalApproved,
                                        totalWithdrawalReject,
                                    ],
                                    backgroundColor: [
                                        "#F59E0B",
                                        "#FBBF24",
                                        "#FCD34D",
                                    ],
                                },
                            ],
                        },
                    };
                default:
                    return item;
            }
        });
        setDatas(updatedDatas);
    }, [report]);

    return (
        <>
            <Title name={"Dashboard"} />
            {!isLoading && (
                <div className="flex flex-wrap gap-4 w-full">
                    {report ? (
                        <>
                            <div className="flex flex-wrap gap-4">
                                <CardBasic
                                    link={"profile"}
                                    data={report.statusPartner}
                                    name={"Status Foundation"}
                                    icon={
                                        <IoPersonOutline className="text-5xl font-light text-blue-500" />
                                    }
                                    style={"bg-blue-500/15"}
                                />
                                <CardBasic
                                    link={"withdrawal"}
                                    data={report.totalFund}
                                    type={"money"}
                                    name={"Total Fund"}
                                    icon={
                                        <IoWalletOutline className="text-5xl font-light text-emerald-500" />
                                    }
                                    style={"bg-emerald-500/15"}
                                />
                            </div>

                            <div className=" flex flex-wrap gap-4 ">
                                <EachUtils
                                    of={datas}
                                    render={(item) => (
                                        <CardWithChart item={item} />
                                    )}
                                />
                            </div>
                            <TableDisplay
                                link="/dashboard/partner/campaign"
                                name="Campaigns"
                                header={["Title", "Category"]}
                                data={campaigns}
                                item={["title", "category"]}
                            />
                            <TableDisplay
                                link="/dashboard/partner/withdrawal"
                                name="Withdrawals"
                                header={["Title", "Raise Amount"]}
                                data={withdrawals}
                                item={["camptitle", "category"]}
                            />
                        </>
                    ) : (
                        <div className="flex w-full justify-center items-center h-[70vh]">
                            <h1 className="text-dark/80 text-lg">
                                Server not responding
                            </h1>
                        </div>
                    )}
                </div>
            )}

            {isLoading && <Loader />}
        </>
    );
};

export default Dashboard;
