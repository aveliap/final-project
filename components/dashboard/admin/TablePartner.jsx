import IconDetail from "@/components/IconDetail";
import EachUtils from "@/utils/EachUtils";
import { formatPhoneNumber } from "@/utils/Utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TablePartner = () => {
    const { partners, paging } = useSelector((state) => state.adminPartner);
    const { page, size } = paging;

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        <div className="overflow-scroll text-dark/80 font-medium">
            <div className="w-[1280px] xl:w-full border bg-light rounded-lg">
                <div className="grid grid-cols-[.6fr,4fr,3fr,2.5fr,4fr,1fr] px-6 py-4 border-b gap-x-2">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Foundation Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Email</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Phone Number</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Addres</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={partners}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"} 
                                ${index + 1 != partners.length && "border-b"}
                                grid grid-cols-[.6fr,4fr,3fr,2.5fr,4fr,1fr] px-6 py-3 items-center gap-x-2`}
                        >
                            <div className="col-start-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{item.name}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.email}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{formatPhoneNumber(item.phoneNumber)}</h1>
                            </div>
                            <div className="col-start-5">
                                <h1>{item.address}</h1>
                            </div>
                            <div className="col-start-6">
                                <Link
                                    to={`/dashboard/admin/partner/${item.id}`}
                                >
                                    <IconDetail />
                                </Link>
                            </div>
                        </div>
                    )}
                />
                {partners.length == 0 && (
                    <h1 className="text-center py-6">Partner Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TablePartner;
