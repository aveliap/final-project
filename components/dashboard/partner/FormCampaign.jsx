import Button from "@/components/Button";
import CustomModal from "@/components/CustomModal";
import {
    createCampaign,
    getCampaignByPartnerId,
} from "@/redux/feature/partner/campaignSlice";
import { Confirm, Failed, Success } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import { validateFile } from "@/utils/Utils";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";

const option = [
    {
        value: "Select Category",
    },
    {
        value: "Educational Support",
    },
    {
        value: "Infrastructure Support",
    },
    {
        value: "Operational Needs",
    },
];

const FormCampaign = (props) => {
    const { isOpen, closeModal, filter } = props;
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        category: option[0].value,
        title: "",
        description: "",
        goalAmount: 0,
        startDate: null,
        endDate: null,
        image: null,
    });

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 6);

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const handleSelect = () => setIsSelectOpen((state) => !state);

    const handleCloseModal = () => {
        setFormData({
            category: option[0].value,
            title: "",
            description: "",
            goalAmount: 0,
            startDate: null,
            endDate: null,
            image: null,
        });
        setIsSelectOpen(false);
        closeModal();
    };

    const handleChange = (e) => {
        if (e?.target) {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        } else {
            const { startDate, endDate } = e;
            if (startDate >= oneWeekFromNow) {
                setFormData({ ...formData, startDate, endDate });
            } else {
                setFormData({
                    ...formData,
                    startDate: null,
                    endDate: null,
                });
            }
        }
    };

    const handleChangeFile = (e) => {
        const { name, files } = e.target;
        if (files.length < 1) {
            return setFormData({ ...formData, [name]: "" });
        }
        if (validateFile(files, "image")) {
            return setFormData({ ...formData, [name]: files[0] });
        } else {
            return setFormData({ ...formData, [name]: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.category === option[0].value) {
            return Failed("Select category");
        }

        Confirm("Add a new campaign", () => {
            handleSaveCampaign(formData);
            handleCloseModal();
        });
    };

    const handleSaveCampaign = async (formData) => {
        try {
            const data = new FormData();

            const sanitizedString = formData.goalAmount.replace(/[^0-9]/g, "");
            const goalAmount = parseInt(sanitizedString, 10);

            const startDate = new Date(formData.startDate)
                .toISOString()
                .split("T")[0];
            const endDate = new Date(formData.endDate)
                .toISOString()
                .split("T")[0];

            data.append("category", formData.category);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("startDate", startDate);
            data.append("endDate", endDate);
            data.append("goalAmount", goalAmount);
            data.append("partnerId", user.id);
            data.append("file", formData.image);

            await dispatch(createCampaign(data)).unwrap();
            Success("Successfully add new campaign");
            await dispatch(
                getCampaignByPartnerId({
                    id: user.id,
                    status: filter,
                })
            ).unwrap();
        } catch (error) {
            console.log(error);
            Failed("Failed create campaign");
        }
    };

    return (
        <>
            <CustomModal isOpen={isOpen}>
                <main className="flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-dark">Add Campaign</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="title"
                                        className="text-black/80"
                                    >
                                        Title
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="title"
                                    onInput={handleChange}
                                    autoComplete="off"
                                    name="title"
                                    maxLength={100}
                                    placeholder="Enter the title of campaign"
                                    className={`px-5 py-4  outline-none rounded-md border focus:shadow-sm  bg-light`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="category"
                                        className="text-black/80"
                                    >
                                        Category
                                    </label>
                                </div>
                                <div
                                    onClick={handleSelect}
                                    className={`flex relative items-center justify-between w-full border h-full rounded-md px-5 py-4 bg-white cursor-pointer ${
                                        formData.category !==
                                            "Select Category" && "text-dark"
                                    }`}
                                >
                                    <h1>{formData.category}</h1>
                                    <FaAngleRight
                                        className={`transition-template ${
                                            isSelectOpen && "rotate-90"
                                        }`}
                                    />
                                    <div
                                        className={`absolute z-50 flex flex-col left-0 top-16 bg-light w-full rounded-md border shadow-md p-2 ${
                                            !isSelectOpen && "hidden"
                                        }`}
                                    >
                                        <EachUtils
                                            of={option}
                                            render={(item) => (
                                                <h1
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            category:
                                                                item.value,
                                                        })
                                                    }
                                                    className="w-full p-1 px-2 rounded-md  hover:bg-primary/10 text-accent transition-template"
                                                >
                                                    {item.value}
                                                </h1>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="goalAmount"
                                        className="text-black/80"
                                    >
                                        Goal Amount
                                    </label>
                                </div>
                                <CurrencyInput
                                    id="goalAmount"
                                    name="goalAmount"
                                    placeholder="Enter the donation goal amount"
                                    decimalsLimit={0}
                                    onInput={handleChange}
                                    prefix="Rp"
                                    groupSeparator="."
                                    decimalSeparator=","
                                    intlConfig={{
                                        locale: "id-ID",
                                        currency: "IDR",
                                    }}
                                    className={`px-5 py-4 no-arrow outline-none rounded-md border focus:shadow-sm bg-white`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label className="text-black/80">
                                        Range Date
                                    </label>
                                    <h1 className="text-xs text-warning font-medium">
                                        *Minimum start date is 1 week from now
                                    </h1>
                                </div>
                                <div className="w-full h-max border py-2 rounded-md">
                                    <Datepicker
                                        value={{
                                            startDate: formData.startDate,
                                            endDate: formData.endDate,
                                        }}
                                        onChange={handleChange}
                                        primaryColor="blue"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="image"
                                        className="text-black/80"
                                    >
                                        Image
                                    </label>
                                </div>
                                <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-40">
                                    <h1
                                        className={`text-sm lg:text-base font-medium text-accent ${
                                            formData.image?.name &&
                                            "text-black/70"
                                        }`}
                                    >
                                        {formData.image?.name ||
                                            "Upload image of campaign"}
                                    </h1>
                                    <input
                                        type="file"
                                        required
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChangeFile}
                                        className={`absolute w-full h-full opacity-0 cursor-pointer`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="description"
                                        className="text-black/80"
                                    >
                                        Description
                                    </label>
                                </div>
                                <textarea
                                    type="text"
                                    id="description"
                                    required
                                    onInput={handleChange}
                                    autoComplete="off"
                                    name="description"
                                    placeholder="Enter description for your foundation"
                                    maxLength={255}
                                    className={`px-5 py-4 h-40 lg:h-40 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                                />
                            </div>
                        </div>

                        <div className="text-lg mt-4 flex gap-2 justify-end">
                            <Button type={"submit"} name={"Submit"} />
                            <Button
                                type={"reset"}
                                name={"Cancel"}
                                onClick={handleCloseModal}
                            />
                        </div>
                    </form>
                </main>
            </CustomModal>
        </>
    );
};

export default FormCampaign;
