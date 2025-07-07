import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
    const { isLogin, role } = useSelector((state) => state.auth);

    if (isLogin !== null) {
        if (isLogin && role === "ADMIN") {
            return children;
        }
        return <Navigate to={"/"} />;
    }
};

export default AdminProtected;
