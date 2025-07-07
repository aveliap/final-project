import Routers from "@/router/Routers";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useDispatch } from "react-redux";
import { setAuth } from "./redux/feature/authSlice";
import { Failed } from "./utils/AlertUtil";

const App = () => {
    const dispatch = useDispatch();

    const [isMounted, setIsMounted] = useState(false);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    const { isExpired, decodedToken } = useJwt(token);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        if (!token) {
            dispatch(
                setAuth({ token: null, isLogin: false, role: null, user: null })
            );
            return;
        }

        if (decodedToken && !isExpired) {
            dispatch(setAuth({ token, isLogin: true, role, user }));
        } else {
            Failed("You have to login again");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
            dispatch(
                setAuth({ token: null, isLogin: false, role: null, user: null })
            );
        }
    }, [isMounted, decodedToken, dispatch, token, isExpired, role, user]);

    return <Routers />;
};

export default App;
