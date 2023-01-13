import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createDebtReminderSocket,
    findAllCreatedDebtReminder,
    findAllReceivedDebtReminder,
    findAllUnPaidDebtReminder,
    payDebt,
    payDebtSuccess,
    removeCreatedDebtReminder,
    removeReceivedDebtReminder,
    verifyOtp,
    verifyOtpSuccess,
} from "../constants/debtReminderConstants";
import { onInit } from "../features/debtReminder/debtReminderSlice";
import { onInitReceivedDebt } from "../features/debtReminder/debtReceivedSlice";
import { CREATED_DEBT } from "../constants/buttonType";
import { closeNotification, newNotification, updateCurrentDebt, updateCurrentTransaction } from "../features/notification/notificationSlice";
import { SRC } from "../constants/payTransactionFee";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

import "../styles/header.css";
import Toast from "./toast";
const socket = io.connect("http://ec2-35-171-9-165.compute-1.amazonaws.com:3001");
const Footer = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("userToken");
    const { userInfo } = useSelector((state) => state.auth);
    const [list, setList] = useState([]);
    const notification = useSelector((state) => state.notification);
    let toastProperties = null;
    const showToast = (type, message) => {
        switch (type) {
            case "success":
                toastProperties = {
                    id: list.length + 1,
                    title: "Success",
                    description: message,
                    backgroundColor: "new-green",
                };
                break;
            case "danger":
                toastProperties = {
                    id: list.length + 1,
                    title: "Thông báo",
                    description: message,
                    backgroundColor: "red",
                };
                break;
            case "info":
                toastProperties = {
                    id: list.length + 1,
                    title: "Info",
                    description: message,
                    backgroundColor: "#5bc0de",
                };
                break;
            case "warning":
                toastProperties = {
                    id: list.length + 1,
                    title: "Warning",
                    description: message,
                    backgroundColor: "#f0ad4e",
                };
                break;
            default:
                toastProperties = [];
        }
        setList([...list, toastProperties]);
    };
    useEffect(() => {
        if (notification.message) {
            showToast("danger", notification.message)
        }
    }, [notification]);


    if (!userInfo) {
        return null
    }
    return (
        <div>
            <Link to="/unpaid-loan">
                <Toast toastlist={list} setList={setList} />
            </Link>
        </div>
    );
};

export default Footer;
