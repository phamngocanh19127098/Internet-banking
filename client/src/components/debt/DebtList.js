import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDebtReminder } from "../../features/debtReminder/debtReminderSlice";
import io from "socket.io-client";
import {
    payDebt,
    removeCreatedDebtReminder,
    removeReceivedDebtReminder,
} from "../../constants/debtReminderConstants";
import { CREATED_DEBT, PAY_DEBT, RECEIVED_DEBT } from "../../constants/buttonType";
import { SRC } from "../../constants/payTransactionFee";
const socket = io.connect(
    "http://localhost:3001"
);
const DebtList = (props) => {
    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const handlePayDebtAction = (userId, amount) => {
        socket.emit(payDebt, {
            authorization: `Bearer ${token}`,
            toUserId: userId,
            amount: amount,
            description: "Thanh toán nợ",
            payTransactionFee: SRC,
        });
    };

    return (
        <div>
            <div className="bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] h-64 relative duration-300">
                {props.debtReminders.length !== 0 ? (
                    <div className=" h-64  place-items-start overflow-y-auto overflow-x-auto">
                        <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                            <table className=" table-fixed border-0 min-w-full">
                                <thead className=" border-0 border-b border-b-black">
                                    <tr>
                                        <th className="px-4 py-3 pr-20 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                            Người gửi
                                        </th>
                                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                            Gửi đến
                                        </th>
                                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                            Số tiền nợ
                                        </th>
                                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black">

                                        </th>
                                        <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.debtReminders.map((account, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="px-4 py-2">
                                                <div className="text-sm font-bold text-black-900">
                                                    {account.accountSrcNumber}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="text-sm text-black-900">
                                                    {account.accountDesNumber}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="text-sm text-black-900">
                                                    {account.amount}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="text-sm text-black-900">
                                                    {account.paymentStatus}
                                                </div>
                                            </td>

                                            <td className="px-6 py-2">
                                                <div>
                                                    {(props.type === CREATED_DEBT || props.type === RECEIVED_DEBT) && (
                                                        <button
                                                            className="cursor-pointer px-10 py-2 text-sm font-bold text-white text-center bg-medium-pink-red rounded-full hover:bg-[#870e2b] disabled:bg-[#edb395]"
                                                            onClick={() => {
                                                                if (props.type === CREATED_DEBT) {
                                                                    dispatch(removeDebtReminder(account.id));
                                                                    socket.emit(removeCreatedDebtReminder, {
                                                                        userId: userInfo.id,
                                                                        id: account.id,
                                                                    });
                                                                } else if (props.type === RECEIVED_DEBT) {
                                                                    dispatch(removeDebtReminder(account.id));
                                                                    socket.emit(removeReceivedDebtReminder, {
                                                                        userId: userInfo.id,
                                                                        id: account.id,
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            Xóa
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-2">
                                                <div>
                                                    {(props.type === PAY_DEBT || props.type === RECEIVED_DEBT) && (
                                                        <button
                                                            className="cursor-pointer h-fit w-fit  px-6 py-2 text-sm font-bold text-white bg-brightblue rounded-full hover:bg-hover-brightblue"
                                                            onClick={handlePayDebtAction(account.userId, account.amount)}
                                                        >
                                                            Thanh toán
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className=" text-lg font-semibold border-b border-gray-300">
                        Danh sách trống
                    </div>
                )}

            </div>
        </div>

    );
};

export default DebtList;
