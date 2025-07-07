import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <section className="flex justify-center">
                <main className="auth-container min-h-screen padding">
                    <Outlet />
                </main>
            </section>
        </>
    );
};

export default AuthLayout;
