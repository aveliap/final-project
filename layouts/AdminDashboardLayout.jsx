import { logout } from "@/redux/feature/authSlice";
import { Logout } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { FaThLarge, FaUserFriends } from "react-icons/fa";
import {
    FaArrowRightFromBracket,
    FaChevronLeft,
    FaHeart,
    FaMoneyCheckDollar,
    FaPeopleRoof,
    FaUser,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

import logo from "@/assets/images/logo.webp";

const list = [
    {
        name: "Dashboard",
        link: "/dashboard/admin",
        icon: <FaThLarge size={14} color="#eee" />,
        slug: "",
    },
    {
        name: "Partner",
        link: "/dashboard/admin/partner",
        icon: <FaPeopleRoof size={14} color="#eee" />,
        slug: "partner",
    },
    {
        name: "Campaign",
        link: "/dashboard/admin/campaign",
        icon: <FaHeart size={14} color="#eee" />,
        slug: "campaign",
    },
    {
        name: "Withdrawal",
        link: "/dashboard/admin/withdrawal",
        icon: <FaMoneyCheckDollar size={14} color="#eee" />,
        slug: "withdrawal",
    },
    {
        name: "Donor",
        link: "/dashboard/admin/donor",
        icon: <FaUser size={14} color="#eee" />,
        slug: "donor",
    },
];

const AdminDashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 1023);
    const location = useLocation().pathname.split("/")[3] || "";
    const dispatch = useDispatch();

    const handleLogout = () => {
        Logout(() => {
            dispatch(logout());
        });
    };

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setIsOpen(false);
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) {
                setIsOpen(true);
            }
            if (window.innerWidth < 1000) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <section className="flex  bg-dark relative ">
                <nav
                    className={`${
                        isOpen ? "w-72 md:w-56" : "w-16 "
                    } px-2 justify-between transition-all fixed bg-dark z-50 duration-300 flex flex-col py-8 h-screen`}
                >
                    <div
                        className={`cursor-pointer absolute p-2 bg-white border border-dark rounded-full top-20 -right-[12px] lg:hidden ${
                            !isOpen ? "rotate-180" : ""
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaChevronLeft size={8} color="black" />
                    </div>

                    <Link
                        to="/"
                        className="flex gap-2 w-max self-center items-center justify-start"
                    >
                        <div className="w-10 h-10">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {isOpen && (
                            <h1 className="text-primary text-xl font-medium">
                                CareMate
                            </h1>
                        )}
                    </Link>

                    <main className=" flex flex-col gap-y-2 h-[74%]">
                        <EachUtils
                            of={list}
                            render={(item) => (
                                <Link
                                    to={item.link}
                                    className={`flex gap-4 p-4 py-5 rounded-md hover:bg-primary duration-300 items-center ${
                                        isOpen
                                            ? "justify-start"
                                            : "justify-start"
                                    }  ${
                                        location === item.slug && "bg-primary"
                                    }`}
                                >
                                    <div className={`${!isOpen && "mx-auto"}`}>
                                        {item.icon}
                                    </div>
                                    <h1
                                        className={`${
                                            isOpen ? "" : "hidden"
                                        } text-sm md:text-md text-white`}
                                    >
                                        {item.name}
                                    </h1>
                                </Link>
                            )}
                        />
                    </main>

                    <div
                        onClick={handleLogout}
                        className={`flex gap-4 p-4 rounded-md hover:bg-primary duration-300 cursor-pointer items-center ${
                            isOpen ? "justify-start" : "justify-start"
                        } `}
                    >
                        <div className={`${!isOpen && "mx-auto"}`}>
                            <FaArrowRightFromBracket size={18} color="#eee" />
                        </div>
                        <h1
                            className={`${
                                isOpen ? "" : "hidden"
                            } md:text-md text-white`}
                        >
                            Logout
                        </h1>
                    </div>
                </nav>

                <main
                    className={`bg-gray-50 overflow-x-hidden transition-all duration-300 w-full py-10 px-6 sm:px-8 md:px-16 relative ${
                        isOpen ? "ml-56" : "ml-16"
                    } min-h-screen`}
                >
                    <Outlet />
                </main>
            </section>
        </>
    );
};

export default AdminDashboardLayout;
