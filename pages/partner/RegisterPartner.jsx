import { clearAuthStatus, register } from "@/redux/feature/authSlice";
import { Failed, Success } from "@/utils/AlertUtil";
import { validateEmail, validatePassword } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.webp";

const image = "https://account.enigmacamp.com/3.jpg";

const RegisterPartner = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        foundationName: "",
        address: "",
        phoneNumber: "",
    });
    const [isMount, setIsMount] = useState(false);

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
        useState(false);

    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [isCurrentPasswordFocus, setIsCurrentPasswordFocus] = useState(false);

    const [typePassword, setTypePassword] = useState("password");
    const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const { email, password, confirmPassword } = auth;

        setIsEmailInvalid(
            validateEmail(email) || email.length <= 0 ? false : true
        );
        setIsPasswordInvalid(
            validatePassword(password) || password.length <= 0 ? false : true
        );

        setIsConfirmPasswordInvalid(
            password === confirmPassword || confirmPassword.length <= 0
                ? false
                : true
        );
    }, [auth]);

    const handleChange = (e) => {
        if (e?.target) {
            const { name, value } = e.target;
            setAuth((state) => ({ ...state, [name]: value }));
        } else {
            setAuth((state) => ({ ...state, phoneNumber: e }));
        }
    };

    const handleClickPassword = () => {
        setTypePassword((state) =>
            state === "password" ? "text" : "password"
        );
    };

    const handleClickConfirmPassword = () => {
        setTypeConfirmPassword((state) =>
            state === "password" ? "text" : "password"
        );
    };

    const handleFocusPassword = () => setIsPasswordFocus(true);
    const handleBlurPassword = () => setIsPasswordFocus(false);

    const handleFocusConfirmPassword = () => setIsCurrentPasswordFocus(true);
    const handleBlurConfirmPassword = () => setIsCurrentPasswordFocus(false);

    const clearState = () => {
        setAuth({
            email: "",
            password: "",
            confirmPassword: "",
            foundationName: "",
            address: "",
            phoneNumber: "",
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            e.target.reset();

            await dispatch(register(auth)).unwrap();
            Success("Successful registration");

            clearState();
            dispatch(clearAuthStatus());

            return navigate("/partner/signin");
        } catch (error) {
            handleFailedRegistration(error?.message);
            dispatch(clearAuthStatus());
        }
    };

    const handleFailedRegistration = (message = "") => {
        if (message === "Email already exists.") {
            return Failed("Email has been registered");
        }

        if (message === "Phone_number already exists.") {
            return Failed("Phone number already exists");
        }

        return Failed("Failed registration");
    };

    return (
        <section className="h-full flex">
            <aside className="hidden lg:flex lg:w-2/3">
                <img src={image} alt="hero" />
            </aside>
            <main className="flex flex-col h-full items-center py-4 lg:w-1/3 ">
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
                    Register today to unite your foundation for a better future
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-11/12 lg:max-w-lg"
                >
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="foundationName"
                                    className="text-black/80"
                                >
                                    Foundation name
                                </label>
                            </div>
                            <input
                                type="text"
                                required
                                id="foundationName"
                                autoComplete="off"
                                name="foundationName"
                                onInput={handleChange}
                                placeholder="Enter your foundation name"
                                className="px-5 py-4 text-black/80 outline-none rounded-md border focus:shadow-sm  bg-white"
                            />
                        </div>

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
                                    htmlFor="address"
                                    className="text-black/80"
                                >
                                    Address
                                </label>
                            </div>
                            <input
                                type="text"
                                required
                                id="address"
                                autoComplete="off"
                                name="address"
                                onInput={handleChange}
                                placeholder="Enter your contact address"
                                className="px-5 py-4 text-black/80 no-arrow outline-none rounded-md border focus:shadow-sm bg-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="phoneNumber"
                                    className="text-black/80"
                                >
                                    Phone Number
                                </label>
                            </div>
                            <input
                                type="number"
                                required
                                id="phoneNumber"
                                autoComplete="off"
                                name="phoneNumber"
                                onInput={handleChange}
                                placeholder="Enter your phone number"
                                className="px-5 py-4 text-black/80 no-arrow outline-none rounded-md border focus:shadow-sm  bg-white"
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
                                    isPasswordFocus && "shadow-sm"
                                }`}
                            >
                                <input
                                    type={typePassword}
                                    required
                                    name="password"
                                    autoComplete="off"
                                    id="password"
                                    placeholder="Enter your password"
                                    onInput={handleChange}
                                    className="bg-white text-black/80 outline-none w-[95%]"
                                    onFocus={handleFocusPassword}
                                    onBlur={handleBlurPassword}
                                />
                                <div
                                    className="cursor-pointer text-lg "
                                    onClick={handleClickPassword}
                                >
                                    {typePassword === "password" ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-black/80"
                                >
                                    Confirm Password
                                </label>
                                {isConfirmPasswordInvalid && (
                                    <p className="text-xs font-medium text-error">
                                        *Invalid Confirm Password
                                    </p>
                                )}
                            </div>
                            <div
                                className={`flex justify-between gap-2 items-center relative px-5 py-4 outline-none rounded-md border bg-white ${
                                    isCurrentPasswordFocus && "shadow-sm"
                                }`}
                            >
                                <input
                                    type={typeConfirmPassword}
                                    required
                                    name="confirmPassword"
                                    autoComplete="off"
                                    id="confirmPassword"
                                    placeholder="Enter confirm password"
                                    onInput={handleChange}
                                    className="bg-white text-black/80 outline-none w-[95%]"
                                    onFocus={handleFocusConfirmPassword}
                                    onBlur={handleBlurConfirmPassword}
                                />
                                <div
                                    className="cursor-pointer text-lg "
                                    onClick={handleClickConfirmPassword}
                                >
                                    {typeConfirmPassword === "password" ? (
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
                                    isPasswordInvalid ||
                                    isEmailInvalid ||
                                    isConfirmPasswordInvalid
                                        ? true
                                        : false
                                }
                            >
                                Register
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <h1 className="text-dark text-sm">
                                Already have an account ?{" "}
                                <Link
                                    to={"/partner/signin"}
                                    className="text-primary font-medium cursor-pointer"
                                >
                                    Login
                                </Link>
                            </h1>
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default RegisterPartner;
