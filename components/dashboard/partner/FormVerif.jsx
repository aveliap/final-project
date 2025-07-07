import { Confirm, Failed, Message, Success } from "@/utils/AlertUtil";
import { validateFile } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import FileVerif from "./Input/FileVerif";
import EachUtils from "@/utils/EachUtils";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
    createDocumentPartner,
    getDetailPartner,
    updateDocumentPartner,
} from "@/redux/feature/partner/partnerSlice";

const data = [
    {
        title: "Certification of Foundation Estabishment",
        name: "cfe",
    },
    {
        title: "Financial Report",
        name: "fr",
    },
    {
        title: "Registered Certificate",
        name: "rc",
    },
    {
        title: "Foundation Financial Plan",
        name: "ffp",
    },
    {
        title: "Bank Account",
        name: "ba",
    },
];

const FormVerif = (props) => {
    const { partner, handleIsEditDocument, setIsEditDocument } = props;

    const [document, setDocument] = useState({
        cfe: "",
        fr: "",
        rc: "",
        ffp: "",
        ba: "",
    });

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleChangeFile = (e) => {
        const { name, files } = e.target;
        if (files.length < 1) {
            return setDocument({ ...document, [name]: "" });
        }
        if (validateFile(files, "pdf")) {
            return setDocument({ ...document, [name]: files[0] });
        } else {
            return setDocument({ ...document, [name]: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(document).forEach(([key, value]) => {
            data.append(key, value);
        });

        const { cfeFileName, frFileName, rcFileName, ffpFileName, baFileName } =
            partner;
        if (
            cfeFileName == null &&
            frFileName == null &&
            rcFileName == null &&
            ffpFileName == null &&
            baFileName == null
        ) {
            const { cfe, fr, rc, ffp, ba } = document;
            if (cfe == "" || fr == "" || rc == "" || ffp == "" || ba == "") {
                return Failed("Please upload all files");
            }
            Confirm("Upload document verification", () => {
                return handleSubmitVerification("upload", data);
            });
        } else {
            Confirm(
                "Changing the document will set the foundation status to In Review",
                () => {
                    return handleSubmitVerification("edit", data);
                }
            );
        }
    };

    const handleSubmitVerification = async (type, data) => {
        try {
            if (type === "upload") {
                await dispatch(
                    createDocumentPartner({ id: user.id, data: data })
                ).unwrap();
            } else {
                await dispatch(
                    updateDocumentPartner({
                        id: user.id,
                        data: data,
                    })
                ).unwrap();
            }
            Success("Successfully submit document");
        } catch (error) {
            console.log(error);
            Failed("Failed verification document");
        } finally {
            setIsEditDocument(false);
            setDocument({
                cfe: "",
                fr: "",
                rc: "",
                ffp: "",
                ba: "",
            });
            await dispatch(getDetailPartner(user.id)).unwrap();
        }
    };

    const handleClickMessage = () => {
        Message(partner.message);
    };

    return (
        <>
            <div className="flex justify-between items-end mb-6">
                <p className="text-xs lg:text-sm font-medium text-error">
                    Maximum files is 1MB (.pdf)
                </p>
                {partner.status === "REJECTED" && (
                    <Button
                        type={"button"}
                        name={"Message"}
                        onClick={handleClickMessage}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-2 gap-y-6 w-full items-end lg:flex-row lg:flex-wrap lg:justify-between">
                    <EachUtils
                        of={data}
                        render={(item) => (
                            <FileVerif
                                title={item.title}
                                name={item.name}
                                document={document}
                                handleChangeFile={handleChangeFile}
                            />
                        )}
                    />
                    <div className="w-[32%]"></div>
                </div>
                <div className="text-lg mt-8 flex gap-2 justify-end">
                    <Button type={"submit"} name={"Submit"} />
                    {partner?.cfe == null &&
                        partner?.fr == null &&
                        partner?.rc == null &&
                        partner?.ffp == null &&
                        partner?.ba == null && (
                            <Button
                                type={"reset"}
                                name={"Cancel"}
                                onClick={handleIsEditDocument}
                            />
                        )}
                </div>
            </form>
        </>
    );
};

export default FormVerif;
