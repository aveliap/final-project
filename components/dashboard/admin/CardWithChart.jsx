import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import EachUtils from "@/utils/EachUtils";
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        arc: {
            borderWidth: 2,
            hoverBorderColor: "transparent",
            borderRadius: 3,
        },
    },
    cutout: "50%",
};

const CardWithChart = ({ item }) => {
    return (
        <Link
            to={item.link}
            className="text-dark/85 flex flex-col rounded-2xl border shadow-sm h-max w-max min-w-72 px-5 py-8 transition-template hover:shadow-md bg-light"
        >
            <h1 className="font-semibold mb-1">{item.name}</h1>
            <h2 className="text-7xl font-bold">{item.data}</h2>
            <div className="flex gap-2 items-end justify-between">
                <div className="h-max flex flex-col text-[10px]">
                    <EachUtils
                        of={item.legend}
                        render={(legend, index) => (
                            <div className="flex items-center gap-1">
                                <span
                                    style={{
                                        backgroundColor: item.colors[index],
                                    }}
                                    className="h-3 w-4 rounded-full"
                                />
                                <h1 className="text-accent font-semibold">
                                    {legend.name}
                                </h1>
                            </div>
                        )}
                    />
                </div>
                <div className="w-40 aspect-square">
                    <Doughnut data={item.dataChart} options={options} />
                </div>
            </div>
        </Link>
    );
};

export default CardWithChart;
