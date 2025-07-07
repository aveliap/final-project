import { useDispatch, useSelector } from "react-redux";
import { validateFile } from "@/utils/Utils";
import { useState } from "react";

import Button from "@/components/Button";
import {
    createCampaignReport,
    getCampaignReportByCampaignId,
} from "@/redux/feature/partner/campaignReportSlice";
import { Confirm, Failed, Success } from "@/utils/AlertUtil";

const FormCampaignReports = () => {
    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);

    const [dataReport, setDataReport] = useState({
        description: null,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (files.length === 0) {
                setDataReport((prevData) => ({ ...prevData, [name]: null }));
                return;
            }

            const newFile = validateFile(files, "image") ? files[0] : null;
            setDataReport((prevData) => ({ ...prevData, [name]: newFile }));
            return;
        }

        setDataReport((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveCampaignReport = async (e) => {
        e.preventDefault();

        if (currentCampaign.isWithdrawal !== "APPROVED") {
            resetForm(e);
            return Failed(
                "Campaign reports are accessible once the campaign withdrawal is approved"
            );
        }

        try {
            Confirm("Create a campaign report", async () => {
                const data = new FormData();
                data.append("description", dataReport.description);
                data.append("file", dataReport.image);
                data.append("campaignId", currentCampaign.id);

                await dispatch(createCampaignReport(data)).unwrap();
                Success("Successfully create campaign report");
                await dispatch(
                    getCampaignReportByCampaignId({ id: currentCampaign.id })
                ).unwrap();
                resetForm(e);
            });
        } catch (error) {
            console.log(error);
            Failed("Failed create campaign report");
        }
    };

    const resetForm = (e) => {
        e.target.reset();
        setDataReport({
            description: null,
            image: null,
        });
    };

    return (
        <form
            onSubmit={handleSaveCampaignReport}
            className="px-4 py-6 border rounded-xl h-max w-full xl:w-1/4 flex flex-col gap-4 bg-light"
        >
            <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-black/80">
                    Image
                </label>
                <div className="border-dashed overflow-hidden border flex relative px-4 justify-center items-center border-accent rounded-md h-32">
                    <h1
                        className={`text-sm lg:text-base font-medium text-accent ${
                            dataReport.image?.name && "text-black/70"
                        }`}
                    >
                        {dataReport.image?.name || "Upload your file"}
                    </h1>
                    <input
                        type="file"
                        required
                        id="image"
                        onChange={handleChange}
                        name="image"
                        accept="image/*"
                        className={`absolute w-full h-full opacity-0 cursor-pointer`}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="description" className="text-black/80">
                    Description
                </label>
                <textarea
                    type="text"
                    id="description"
                    autoComplete="off"
                    required
                    onInput={handleChange}
                    name="description"
                    placeholder="Description for campaign report"
                    maxLength={150}
                    className={`px-5 py-4 h-24 lg:h-44 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                />
            </div>
            <div className="flex justify-end">
                <Button type={"submit"} name={"Add Campaign Report"} />
            </div>
        </form>
    );
};

export default FormCampaignReports;
