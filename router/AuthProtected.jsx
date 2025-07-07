import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth);

    if (isLogin !== null) {
        if (isLogin) {
            return <Navigate to={"/"} />;
        }
        return children;
    }
};

export default AuthProtected;
