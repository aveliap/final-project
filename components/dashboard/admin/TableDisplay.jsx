import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter, limitText } from "@/utils/Utils";
import React from "react";
import { Link } from "react-router-dom";

const TableDisplay = (props) => {
    const { link, name, header, data } = props;

    return (
        <div className="overflow-scroll text-dark/80 font-medium w-full lg:w-[49%]">
            <div className="w-full border bg-light rounded-2xl text-sm">
                <div className="gap-x-4 px-6 py-4  flex justify-between items-center">
                    <h1 className="text-lg">{name} Status</h1>
                    <Link
                        to={link}
                        className="flex justify-center items-center px-3 py-2 border rounded-lg"
                    >
                        <h1 className="font-normal">See All</h1>
                    </Link>
                </div>
                <div className="grid grid-cols-[2fr,1.7fr,.7fr] px-6 py-3 bg-gray-50 text-dark/50 bordeb gap-x-4">
                    <div className="col-start-1">
                        <h1>{header[0]}</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>{header[1]}</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Status</h1>
                    </div>
                </div>
                <EachUtils
                    of={data}
                    render={(item) => (
                        <div
                            className={`
                                grid grid-cols-[2fr,1.7fr,.7fr] px-6 py-3 items-center gap-x-4 break-words`}
                        >
                            <div className="col-start-1">
                                <h1>{limitText(item.title, 30)}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{limitText(item.category, 30)}</h1>
                            </div>
                            <div className="col-start-3">
                                <div
                                    className={`flex justify-center items-center px-2 py-1 rounded-full 
                                    ${
                                        (item.status === "IN_REVIEW" ||
                                            item.status === "PENDING") &&
                                        "text-yellow-500 bg-yellow-50"
                                    }
                                    ${
                                        (item.status === "ACTIVE" ||
                                            item.status === "APPROVED") &&
                                        "text-primary bg-emerald-50"
                                    }
                                    ${
                                        item.status === "COMPLETED" &&
                                        "text-blue-500 bg-blue-50"
                                    }
                                    ${
                                        item.status === "REJECTED" &&
                                        "text-error bg-red-50"
                                    }
                                    `}
                                >
                                    <h1>
                                        {capitalizeFirstLetter(item.status)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default TableDisplay;
