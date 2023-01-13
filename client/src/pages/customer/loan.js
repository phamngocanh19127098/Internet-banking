import React, { useEffect, useState } from "react";
import HomeNavigation from "../../components/homeNavigation";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
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
} from "../../constants/debtReminderConstants";
import DebtList from "../../components/debt/DebtList";
import { onInit } from "../../features/debtReminder/debtReminderSlice";
import { onInitReceivedDebt } from "../../features/debtReminder/debtReceivedSlice";
import DebtReminderList from "../../components/DebtReminderList";
import AddDebtReminder from "../../components/addDebtReminder";
import { CREATED_DEBT, RECEIVED_DEBT } from "../../constants/buttonType";
import { closeNotification, newNotification, updateCurrentDebt, updateCurrentTransaction } from "../../features/notification/notificationSlice";
import { SRC } from "../../constants/payTransactionFee";
const socket = io.connect("http://localhost:3001");

const Loan = () => {
  const token = localStorage.getItem("userToken");
  const { userInfo } = useSelector((state) => state.auth);
  const debtReminder = useSelector((state) => state.debtReminder);
  const debtReceived = useSelector((state) => state.debtReceived);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [otp, setOtp] = useState("");
  const handleOnCloseAdd = () => setShowAddModal(false);
  // const [notification, setNotification] = useState("");

  const notification = useSelector((state) => state.notification);

  const handlePayDebt = () => {
    console.log(notification.currentPaymentDebt);
    socket.emit(
      payDebt,
      {
        authorization: `Bearer ${token}`,
        toUserId: notification.currentPaymentDebt.userId,
        amount: notification.currentPaymentDebt.amount,
        description: "Thanh toán nợ",
        payTransactionFee: SRC
      }
    )
  }

  const handleSubmitOtp = () => {
    socket.emit(
      verifyOtp,
      {
        authorization: `Bearer ${token}`,
        transactionId: notification.currentTransaction.data.id,
        otpCode: otp,
      }
    )
  }

  useEffect(() => {
    socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
  }, [userInfo.id]);

  useEffect(() => {
    socket.on(findAllCreatedDebtReminder, (response) => {
      if (response.userId === userInfo.id) {
        dispatch(onInit(response.data));
      }
    });
  }, [dispatch, userInfo.id]);

  // Thông báo cho người khác khi user hiện tại tạo nhắc nợ
  useEffect(() => {
    socket.on(createDebtReminderSocket, (data) => {
      if (userInfo.id === data.receiverId) {
        console.log(data);
        let message = `Một yêu cầu thanh toán nợ ${data.amount} VND đã được tạo bởi ${data.createdName} với lời nhắn là ${data.description}`;
        dispatch(newNotification(message));
        socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
        dispatch(updateCurrentDebt(data));
      }
    });
  }, [userInfo.id, dispatch]);

  useEffect(() => {
    socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
  }, [userInfo.id]);

  useEffect(() => {
    socket.on(findAllReceivedDebtReminder, (response) => {
      if (response.userId === userInfo.id) {
        dispatch(onInitReceivedDebt(response.data));
      }
    });
  }, [dispatch, userInfo.id]);

  // Thông báo cho người khác khi user hiện tại xóa nợ do mình tạo
  useEffect(() => {
    socket.on(removeCreatedDebtReminder, (data) => {
      if (userInfo.id === data.receiverId) {
        let message = `Một yêu cầu thanh toán nợ ${data.amount} VND vừa được xóa bởi bởi ${data.actionTakerName}`;
        dispatch(newNotification(message));
        socket.emit(findAllReceivedDebtReminder, { userId: data.receiverId });
        socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
      }
    });
  }, [userInfo.id, dispatch]);

  // Thông báo cho user hiện tại khi người khác xóa thông báo nhắc nợ
  useEffect(() => {
    socket.on(removeReceivedDebtReminder, (data) => {
      if (userInfo.id === data.userId) {
        let message = `Một yêu cầu thanh toán nợ ${data.amount} VND vừa được xóa bởi bởi ${data.actionTakerName}`;
        dispatch(newNotification(message));
        socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
        socket.emit(findAllReceivedDebtReminder, { userId: data.receiverId });
      }
    });
  }, [userInfo.id, dispatch]);

  useEffect(() => {
    socket.on(payDebtSuccess, (response) => {
      if (userInfo.id === response.userId) {
        console.log(notification);
        dispatch(closeNotification())
        dispatch(updateCurrentTransaction(response));
      }

    });
  }, [userInfo.id, dispatch, notification])

  useEffect(() => {
    socket.on(verifyOtpSuccess, (response) => {
      if (userInfo.id === response.userId) {
        let message = `Một yêu cầu thanh toán nợ với số tiền là ${response.amount} vừa được thanh toán`;
        dispatch(newNotification(message))
        socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
        socket.emit(findAllUnPaidDebtReminder, { userId: userInfo.id });
        socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
      }
      else if (userInfo.id === response.receiverId){
        socket.emit(findAllReceivedDebtReminder, { userId: userInfo.id });
        socket.emit(findAllUnPaidDebtReminder, { userId: userInfo.id });
        socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
      }
    })
  },[notification,dispatch, userInfo.id])

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={5} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              {showAddModal && (
                <AddDebtReminder
                  onClose={handleOnCloseAdd}
                  visible={showAddModal}
                />
              )}
              <div className="flex flex-1 justify-between">
                <h2 className="text-2xl leading-relaxed">
                  Danh sách nợ do người dùng tạo
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(true);
                  }}
                  className="cursor-pointer px-12 py-2 text-sm font-bold text-white bg-green rounded-full hover:bg-[#1bc46e]"
                >
                  Thêm nhắc nợ
                </button>
              </div>
              <div className="">
                <DebtList
                  debtReminders={debtReminder.debtReminders}
                  type={CREATED_DEBT}
                />



              </div>
              <div className="text-2xl leading-relaxed">
                Danh sách nợ do người khác tạo
              </div>
              <div>
                <DebtList
                  debtReminders={debtReceived.debtReceived}
                  type={RECEIVED_DEBT}
                />
              </div>
              <div>
                <div> Thong bao nhac no </div>
                <p>{notification.message}</p>
                <button
                  className="cursor-pointer"
                  onClick={() => dispatch(closeNotification())}
                >
                  Ok
                </button>
                {!notification.isOpen && <button className="cursor-pointer" onClick={handlePayDebt}>Trả ngay</button>}
                <div>
                  <label htmlFor="">Nhập OTP</label>
                  <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value) }} />
                  <div>
                    <button onClick={handleSubmitOtp}>Gửi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
