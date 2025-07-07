import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PartnerProtected = ({ children }) => {
    const { isLogin, role } = useSelector((state) => state.auth);

    if (isLogin !== null) {
        if (isLogin && role === "PARTNER") {
            return children;
        }
        return <Navigate to={"/"} />;
    }
};

export default PartnerProtected;
