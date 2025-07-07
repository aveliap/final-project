import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const BaseLayouts = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <>
            <Header />
            <section className="flex justify-center">
                <main className="container py-20 min-h-screen padding">
                    <Outlet />
                </main>
            </section>
            <Footer />

        </>
    );
};

export default BaseLayouts;
