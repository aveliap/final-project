import { clearAuthStatus, login } from "@/redux/feature/authSlice";
import { Failed, Success } from "@/utils/AlertUtil";
import { validateEmail, validatePassword } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.webp";

const image = "https://account.enigmacamp.com/2.jpg";

const LoginPartner = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });
    const [type, setType] = useState("password");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isMount, setIsMount] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
            return;
        }
        const { email, password } = auth;

        setIsEmailInvalid(
            validateEmail(email) || email.length <= 0 ? false : true
        );
        setIsPasswordInvalid(
            validatePassword(password) || password.length <= 0 ? false : true
        );
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((state) => ({ ...state, [name]: value }));
    };

    const handleClick = () => {
        setType((state) => (state === "password" ? "text" : "password"));
    };

    const handleFocus = () => {
        setIsFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            e.target.reset();
            setAuth({
                email: "",
                password: "",
            });

            await dispatch(login(auth)).unwrap();

            Success("Successfully login");

            dispatch(clearAuthStatus());
            return navigate("/");
        } catch (error) {
            Failed(error.message);
            dispatch(clearAuthStatus());
        }
    };

    return (
        <section className="h-full flex">
            <aside className="hidden lg:flex lg:w-2/3">
                <img src={image} alt="hero" />
            </aside>
            <main className="flex flex-col h-full items-center pt-32 py-20 lg:w-1/3">
                <div className="flex gap-3 justify-center items-center w-max">
                    <div className="w-14 h-14">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-semibold text-primary lg:text-3xl">
                        CareMate
                    </h1>
                </div>
                <h1 className="lg:w-11/12 lg:max-w-lg text-lg font-light text-center text-secondary my-8 lg:text-xl">
                    Welcome back, Partner! Let's make a difference together!
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-11/12 lg:max-w-lg"
                >
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="email"
                                    className="text-black/80"
                                >
                                    Email
                                </label>
                                {isEmailInvalid && (
                                    <p className="text-xs font-medium text-error">
                                        *Invalid format email
                                    </p>
                                )}
                            </div>
                            <input
                                type="email"
                                required
                                id="email"
                                autoComplete="off"
                                name="email"
                                onInput={handleChange}
                                placeholder="Enter your email"
                                className="px-5 py-4 text-black/80 outline-none rounded-md border focus:shadow-sm  bg-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="text-black/80"
                                >
                                    Password
                                </label>
                                {isPasswordInvalid &&
                                    auth.password.length >= 8 && (
                                        <p className="text-xs text-[10px] text-right font-medium text-error">
                                            *Password must contain lowercase,
                                            uppercase, numbers
                                        </p>
                                    )}

                                {auth.password.length < 8 &&
                                    auth.password.length > 0 && (
                                        <p className="text-xs text-right font-medium text-error">
                                            *Password must be 8 letters long
                                        </p>
                                    )}
                            </div>
                            <div
                                className={`flex justify-between gap-2 items-center relative px-5 py-4 outline-none rounded-md border bg-white ${
                                    isFocus && "shadow-sm"
                                }`}
                            >
                                <input
                                    type={type}
                                    required
                                    name="password"
                                    autoComplete="off"
                                    id="password"
                                    placeholder="Enter your password"
                                    onInput={handleChange}
                                    className="bg-white text-black/80 outline-none w-[95%]"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <div
                                    className="cursor-pointer text-lg "
                                    onClick={handleClick}
                                >
                                    {type === "password" ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-lg mt-4">
                            <button
                                className={`w-full bg-primary py-4 text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 ${
                                    (isPasswordInvalid || isEmailInvalid) &&
                                    "cursor-not-allowed"
                                }`}
                                disabled={
                                    isPasswordInvalid || isEmailInvalid
                                        ? true
                                        : false
                                }
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <h1 className="text-dark text-sm">
                                Don't have an account ?{" "}
                                <Link
                                    to={"/partner/signup"}
                                    className="text-primary font-medium cursor-pointer"
                                >
                                    Register
                                </Link>
                            </h1>
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default LoginPartner;
