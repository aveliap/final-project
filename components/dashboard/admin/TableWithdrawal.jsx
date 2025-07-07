import IconDetail from "@/components/IconDetail";
import { setCurrentWithdrawal } from "@/redux/feature/admin/adminWithdrawalSlice";
import EachUtils from "@/utils/EachUtils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TableWithdrawal = (props) => {
    const { handleDetailModal } = props;

    const dispatch = useDispatch();
    const { withdrawals } = useSelector((state) => state.adminWithdrawal);

    const handleClickDetail = (res) => {
        dispatch(setCurrentWithdrawal({ item: res }));
        handleDetailModal();
    };

    return (
        <div className="overflow-scroll text-dark/80 font-medium">
            <div className="w-[1280px] xl:w-full border bg-light rounded-lg">
                <div className="grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-4 border-b gap-x-2">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Foundation Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Campaign Title</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Category</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Total Withdrawal</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Tax</h1>
                    </div>
                    <div className="col-start-7">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={withdrawals}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"}
                                ${index + 1 != withdrawals.length && "border-b"}
                                grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-3 items-center gap-x-2`}
                        >
                            <div className="col-start-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{item.partnerName}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{item.category}</h1>
                            </div>
                            <div className="col-start-5">
                                <FormatRupiah value={item.totalAmount} />
                            </div>
                            <div className="col-start-6">
                                <FormatRupiah value={item.totalTax} />
                            </div>
                            <div className="col-start-7">
                                <div
                                    className="w-max"
                                    onClick={() => handleClickDetail(item)}
                                >
                                    <IconDetail />
                                </div>
                            </div>
                        </div>
                    )}
                />
                {withdrawals.length == 0 && (
                    <h1 className="text-center py-6">Withdrawal Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TableWithdrawal;
