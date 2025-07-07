import Button from "@/components/Button";
import { changePassword } from "@/redux/feature/authSlice";
import { Failed, Success } from "@/utils/AlertUtil";
import { validatePassword } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormPassword = () => {
    const [auth, setAuth] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    const { partner } = useSelector((state) => state.partner);

    const [isMount, setIsMount] = useState(false);
    const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
        useState(false);

    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
            return;
        }

        const { newPassword, confirmPassword } = auth;

        setIsNewPasswordInvalid(
            validatePassword(newPassword) || newPassword.length <= 0
                ? false
                : true
        );

        setIsConfirmPasswordInvalid(
            newPassword === confirmPassword || confirmPassword.length <= 0
                ? false
                : true
        );
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: partner.email,
                oldPassword: auth.oldPassword,
                newPassword: auth.newPassword,
            };
            await dispatch(changePassword(data)).unwrap();
            Success("Successfully change password");
        } catch (error) {
            Failed("Password doesnt match");
        } finally {
            setAuth({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            e.target.reset();
        }
    };

    return (
        <div className="w-max 2xl:w-1/3 p-4 border text-dark/85 h-max rounded-lg bg-light">
            <h1 className="font-medium mb-6">Change Password</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 justify-between"
            >
                <div className={`flex flex-col gap-1 w-full max-w-lg`}>
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={"oldPassword"}
                            className="text-black/80"
                        >
                            Old Password
                        </label>
                    </div>
                    <input
                        autoComplete="off"
                        name="oldPassword"
                        onInput={handleChange}
                        id="oldPassword"
                        type={"password"}
                        required
                        placeholder="Enter your old password"
                        className={`px-5 py-4 outline-none rounded-md border no-arrow focus:shadow-sm bg-white`}
                    />
                </div>
                <div className={`flex flex-col gap-1 w-full max-w-lg`}>
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={"newPassword"}
                            className="text-black/80"
                        >
                            New Password
                        </label>
                        {isNewPasswordInvalid &&
                            auth.newPassword.length >= 8 && (
                                <p className="text-xs text-right font-medium text-error">
                                    *Must contain lowercase, uppercase, numbers
                                </p>
                            )}
                        {auth.newPassword.length < 8 &&
                            auth.newPassword.length > 0 && (
                                <p className="text-xs text-right font-medium text-error">
                                    *Password must be 8 letters long
                                </p>
                            )}
                    </div>
                    <input
                        autoComplete="off"
                        onInput={handleChange}
                        name="newPassword"
                        id="newPassword"
                        type={"password"}
                        required
                        placeholder="Enter your old password"
                        className={`px-5 py-4 outline-none rounded-md border no-arrow focus:shadow-sm bg-white`}
                    />
                </div>
                <div className={`flex flex-col gap-1 w-full max-w-lg`}>
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={"confirmPassword"}
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
                    <input
                        autoComplete="off"
                        name="confirmPassword"
                        id="confirmPassword"
                        type={"password"}
                        onInput={handleChange}
                        required
                        placeholder="Enter your old password"
                        className={`px-5 py-4 outline-none rounded-md border no-arrow focus:shadow-sm bg-white`}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" name={"Edit Password"} />
                </div>
            </form>
        </div>
    );
};

export default FormPassword;
