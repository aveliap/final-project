import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import FormProfile from "@/components/dashboard/partner/FormProfile";
import FormVerif from "@/components/dashboard/partner/FormVerif";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";

import Loader from "@/components/Loader";
import Button from "@/components/Button";
import StatusMessage from "@/components/dashboard/partner/StatusMessage";
import DocumentButtons from "@/components/dashboard/partner/DocumentButtons";
import FormPassword from "@/components/dashboard/partner/FormPassword";

const data = [
    {
        name: "Edit Profile",
    },
    {
        name: "Verification",
    },
];

const Profile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);

    const [filter, setFilter] = useState(data[0].name);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditDocument, setIsEditDocument] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchPartnerDetails();
        }
    }, [user]);

    const fetchPartnerDetails = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching : ", error);
        }
    };

    const handleClickEditProfile = () => {
        setIsEdit((state) => !state);
    };

    const handleIsEditDocument = () => {
        setIsEditDocument((state) => !state);
    };

    return (
        <>
            <Title name={"Profile"} />
            {partner && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    {filter === "Edit Profile" && (
                        <div className="flex flex-col 2xl:flex-row gap-4">
                            <FormProfile
                                isEdit={isEdit}
                                partner={partner}
                                handleClickEditProfile={handleClickEditProfile}
                            />
                            <FormPassword />
                        </div>
                    )}

                    {filter === "Verification" &&
                        (isEditDocument || partner.status === "UNVERIFIED") && (
                            <FormVerif
                                partner={partner}
                                handleIsEditDocument={handleIsEditDocument}
                                setIsEditDocument={setIsEditDocument}
                            />
                        )}

                    {filter === "Verification" &&
                        !isEditDocument &&
                        partner.status !== "UNVERIFIED" && (
                            <>
                                <StatusMessage />
                                <DocumentButtons />
                                <div className="flex justify-end mt-6">
                                    <Button
                                        name={"Edit Document"}
                                        type={"button"}
                                        onClick={handleIsEditDocument}
                                    />
                                </div>
                            </>
                        )}
                </>
            )}

            {!partner && <Loader />}
        </>
    );
};

export default Profile;
