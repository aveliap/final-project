import Button from "@/components/Button";
import { Failed, SuccessUpdate, Update } from "@/utils/AlertUtil";
import { validateEmail } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import InputProfile from "./Input/InputProfile";
import EachUtils from "@/utils/EachUtils";
import { useDispatch, useSelector } from "react-redux";
import {
    getDetailPartner,
    updateProfilePartner,
} from "@/redux/feature/partner/partnerSlice";

const data = [
    {
        title: "Foundation Name",
        name: "name",
        type: "text",
    },
    {
        title: "Email",
        name: "email",
        type: "email",
    },
    {
        title: "Address",
        name: "address",
        type: "text",
    },
    {
        title: "Phone Number",
        name: "phoneNumber",
        type: "number",
    },
    {
        title: "Description",
        name: "description",
        type: "text",
    },
];

const FormProfile = (props) => {
    const { isEdit, partner, handleClickEditProfile } = props;

    const [isMount, setIsMount] = useState(false);
    const [updatedPartner, setUpdatedPartner] = useState(partner);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isMount) {
            const email = updatedPartner?.email;
            setIsEmailInvalid(!validateEmail(email) && email?.length > 0);
        } else {
            setUpdatedPartner(partner);
            setIsMount(true);
        }
    }, [partner, updatedPartner, isMount]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUpdatedPartner({ ...updatedPartner, [name]: value });
    };

    const handleCancelForm = () => {
        setUpdatedPartner(partner);
        handleClickEditProfile();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Update(() => {
            return handleSubmitFormProfile(updatedPartner);
        });
    };

    const handleSubmitFormProfile = async (data) => {
        try {
            await dispatch(
                updateProfilePartner({ id: user.id, data: data })
            ).unwrap();
            SuccessUpdate();
        } catch (error) {
            console.log(error);
            setUpdatedPartner(partner);
            Failed("Failed to update");
        } finally {
            await dispatch(getDetailPartner(user.id)).unwrap();
            handleClickEditProfile();
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className=" w-max 2xl:w-2/3 max-w-3xl 2xl:max-w-full border p-4 text-dark/85 rounded-lg bg-light"
            >
                <h1 className="font-medium mb-6">Change Profile</h1>
                <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                    <EachUtils
                        of={data}
                        render={(item) => (
                            <InputProfile
                                title={item.title}
                                name={item.name}
                                type={item.type}
                                updatedPartner={updatedPartner}
                                handleChangeInput={handleChangeInput}
                                isEdit={isEdit}
                                isEmailInvalid={isEmailInvalid}
                            />
                        )}
                    />
                </div>

                <div className="text-lg mt-4 flex gap-2 justify-end">
                    {!isEdit && (
                        <Button
                            type={"button"}
                            name={"Edit"}
                            onClick={handleClickEditProfile}
                        />
                    )}
                    {isEdit && (
                        <>
                            <Button type={"submit"} name={"Save"} />
                            <Button
                                type={"reset"}
                                name={"Cancel"}
                                onClick={handleCancelForm}
                            />
                        </>
                    )}
                </div>
            </form>
        </>
    );
};

export default FormProfile;
