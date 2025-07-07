import { logout } from "@/redux/feature/authSlice";
import { Logout } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/images/logo.webp";

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const { isLogin, role } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen((state) => !state);
        setIsDetailOpen(false);
    };

    const handleIsDetail = () => {
        setIsDetailOpen((state) => !state);
    };

    const handleAboutDropdown = () => {
        setIsAboutDropdownOpen((state) => !state);
    };

    const handleLogout = () => {
        Logout(() => {
            dispatch(logout());
            setIsDetailOpen(false);
        });
    };

    useEffect(() => {
        setIsOpen(false);
        setIsDetailOpen(false);
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) {
                setIsOpen(false);
                setIsDetailOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const link = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "About us",
            sublinks: [
                { name: "About us", link: "/about" },
                { name: "FAQ", link: "/faq" },
            ],
        },
        {
            name: "News",
            link: "/news",
        },
        {
            name: "Campaign",
            link: "/campaign",
        },
    ];

    const loginList = [
        {
            name: "Partner",
            link: "/partner/signin",
        },
        {
            name: "Admin",
            link: "/admin/signin",
        },
    ];

    const dashboardList = [
        {
            name: "Dashboard",
        },
    ];

    return (
        <section className="flex justify-center w-full fixed z-50 border-b" style={{backgroundColor:"#F9F5E8"}}>
            <main className="container relative lg:flex lg:items-center lg:justify-between">
                <header className="py-4 flex justify-between items-center padding">
                    <Link
                        to={"/"}
                        className="flex justify-center items-center w-max gap-2 cursor-pointer"
                    >
                        <div className="w-7 h-7">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-primary">
                            CareMate
                        </h1>
                    </Link>
                    <div
                        className="cursor-pointer lg:hidden"
                        onClick={handleIsOpen}
                    >
                        {isOpen ? (
                            <FaXmark className="font-medium text-2xl text-[28px] text-accent" />
                        ) : (
                            <FaBars className="font-medium text-2xl text-accent" />
                        )}
                    </div>
                </header>
                <nav
                    className={`padding w-full transition-template lg:h-max lg:static lg:w-max lg:py-5 lg:overflow-visible ${
                        isOpen ? "pt-4 pb-6 h-max" : "h-0 overflow-hidden"
                    }`} style={{backgroundColor:"#F9F5E8"}}
                >
                    <ul
                        className="relative flex flex-col gap-4 text-dark lg:flex-row lg:items-center lg:justify-between lg:w-[440px]"
                    >
                        <EachUtils
                            of={link}
                            render={(item) =>
                                item.sublinks ? (
                                    <li
                                        className="relative flex items-center gap-1 cursor-pointer"
                                        onClick={handleAboutDropdown}
                                    >
                                        <span>{item.name}</span>
                                        <FaAngleDown
                                            className={`transition-transform ${
                                                isAboutDropdownOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                        {isAboutDropdownOpen && (
                                            <ul className="absolute top-full left-0 mt-2 bg-white border rounded-md">
                                                {item.sublinks.map(
                                                    (sublink) => (
                                                        <Link
                                                            to={sublink.link}
                                                            key={sublink.link}
                                                            className="block px-2 py-2 hover:bg-accent/10"
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                ) : (
                                    <Link to={item.link}>
                                        <li
                                            className={`transition-template ${
                                                item.link === location &&
                                                "lg:text-primary"
                                            }`}
                                        >
                                            {item.name}
                                        </li>
                                    </Link>
                                )
                            }
                        />
                        <div onClick={handleIsDetail} className="cursor-pointer">
                            {isLogin ? (
                                <div
                                    className={`border-accent flex gap-2 items-center transition-template ${
                                        isDetailOpen && "border-primary"
                                    }`}
                                >
                                    <h1 className="capitalize">
                                        Hi, {capitalizeFirstLetter(role)}
                                    </h1>
                                    <FaAngleDown
                                        size={12}
                                        className={`${
                                            isDetailOpen &&
                                            "rotate-180 transition-template"
                                        }`}
                                    />
                                </div>
                            ) : (
                                <h1>Login</h1>
                            )}
                        </div>
                        <div
                            className={`${
                                isDetailOpen ? "flex absolute" : "hidden"
                            } flex-col top-[152px] w-52 bg-light border gap-1 p-2 rounded-md lg:top-8 lg:right-0`}
                        >
                            <EachUtils
                                of={!isLogin ? loginList : dashboardList}
                                render={(item) => (
                                    <Link
                                        to={
                                            item.link
                                                ? item.link
                                                : role === "PARTNER"
                                                ? "/dashboard/partner"
                                                : "/dashboard/admin"
                                        }
                                        className="w-full hover:bg-accent/10 transition-template px-2 py-1 rounded-md"
                                    >
                                        <li>{item.name}</li>
                                    </Link>
                                )}
                            />
                            {isLogin && (
                                <div
                                    onClick={handleLogout}
                                    className="w-full hover:bg-accent/10 transition-template px-2 py-1 rounded-md cursor-pointer"
                                >
                                    <li>Logout</li>
                                </div>
                            )}
                        </div>
                    </ul>
                </nav>
            </main>
        </section>
    );
};

export default Header;
