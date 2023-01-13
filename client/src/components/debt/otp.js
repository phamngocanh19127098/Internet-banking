import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { verifyOtp } from "../../constants/debtReminderConstants";
import { findAllCreatedDebtReminder, findAllReceivedDebtReminder, findAllUnPaidDebtReminder } from "../../constants/debtReminderConstants";
import Loader from "../loading";
import { verifyOtpSuccess } from "../../constants/debtReminderConstants";
import { newNotification } from "../../features/notification/notificationSlice";
import { socketOption } from "../../config/socket-option";
const socket = io.connect(
    "http://localhost:3001",
    socketOption
);
const ConfirmOTPDebt = (props) => {
    const token = localStorage.getItem("userToken");
    const [OTP, setOTP] = useState("");
    const { userInfo } = useSelector((state) => state.auth);
    const notification = useSelector((state) => state.notification);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleSubmitOtp = () => {
        socket.emit(
            verifyOtp,
            {
                authorization: `Bearer ${token}`,
                transactionId: notification.currentTransaction.data.id,
                otpCode: OTP,
                debtReminderId: notification.currentPaymentDebt.id
            }
        )
        setIsLoading(true)
    }
    const handleXClick = (e) => {
        //   verifyOTP()
        props.onClose();
    };
    const handleCancelClick = (e) => {
        //   verifyOTP()
        props.onClose();
    };

    useEffect(() => {
        socket.on(verifyOtpSuccess, (response) => {
            if (userInfo.id === response.userId) {
                let message = `Một yêu cầu thanh toán nợ với số tiền là ${response.amount} vừa được thanh toán`;
                dispatch(newNotification(message))
                socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
                socket.emit(findAllUnPaidDebtReminder, { userId: userInfo.id });
                socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
                setIsLoading(false)
                props.onClose()
            }
            else if (userInfo.id === response.receiverId) {
                socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
                socket.emit(findAllUnPaidDebtReminder, { userId: userInfo.id });
                socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
                setIsLoading(false)
                props.onClose()
            }
        })
    }, [notification, dispatch, userInfo.id])
    if (!props.visible) return null

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5 ">
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5 ">
                <button
                    id="handleX"
                    onClick={handleXClick}
                    className="-right-6 -top-6 absolute flex justify-end rounded-full px-4 py-4 ml-4 text-white font-bold bg-black cursor-pointer"
                >
                    <svg
                        className="pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="10 10 50 50"
                        overflow="visible"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    >
                        <line x2="70" y2="70" />
                        <line x1="70" y2="70" />
                    </svg>
                </button>
                <div className="flex  text-lg  text-black font-bold pt-4 px-20 border-b-2 border-b-gray-100">
                    Mời bạn nhập mã OTP
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                    OTP
                </div>
                <div className="flex flex-col mb-4 px-8">
                    <input
                        className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                        id="OTP"
                        type="tel"
                        required
                        onChange={(event) => setOTP(event.target.value)}
                        placeholder="Nhập mã OTP"
                    />
                </div>
                <div className="flex justify-end pb-4 px-8">
                    <button
                        id="handlecancel"
                        onClick={handleCancelClick}
                        className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded hover:bg-[#F3F4F6] bg-white"
                    >
                        Cancel
                    </button>
                    <button
                        id="handleSave"
                        onClick={handleSubmitOtp}
                        className="cursor-pointer rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmOTPDebt;
