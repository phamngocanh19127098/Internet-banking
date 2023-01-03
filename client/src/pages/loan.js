import React, {useEffect, useState} from "react";
import HomeNavigation from '../components/homeNavigation';
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {
  createDebtReminderSocket,
  findAllCreatedDebtReminder,
  findAllReceivedDebtReminder, removeCreatedDebtReminder, removeReceivedDebtReminder
} from "../constants/debtReminderConstants";
import {onInit} from "../features/debtReminder/debtReminderSlice";
import {onInitReceivedDebt} from "../features/debtReminder/debtReceivedSlice";
import DebtReminderList from "../components/DebtReminderList";
import AddDebtReminder from "../components/addDebtReminder";
import {CREATED_DEBT, RECEIVED_DEBT} from "../constants/buttonType";
const socket = io.connect("http://localhost:3001");

const Loan = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const debtReminder = useSelector((state) => state.debtReminder)
  const debtReceived = useSelector((state) => state.debtReceived)
  const dispatch = useDispatch()
  const [notification, setNotification] = useState("")


  useEffect(() => {
    socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
  }, [userInfo.id])

  useEffect(() => {
    socket.on(findAllCreatedDebtReminder, (response) => {
      if (response.userId === userInfo.id) {
        dispatch(onInit(response.data))
      }

    });
  }, [dispatch,userInfo.id]);

  useEffect(() => {
    socket.on(createDebtReminderSocket, (data) => {
      if (userInfo.id === data.receiverId){
        setNotification(`Một yêu cầu thanh toán nợ ${data.amount} VND đã được tạo bởi ${data.createdName} với lời nhắn là ${data.description}`)
        socket.emit(findAllReceivedDebtReminder, {userId : userInfo.id})
      }

    });
  }, [userInfo.id]);

  useEffect(() => {
    socket.emit(findAllReceivedDebtReminder, {userId : userInfo.id})
  }, [userInfo.id])

  useEffect(() => {
    socket.on(findAllReceivedDebtReminder, (response) => {
      if (response.userId === userInfo.id) {
        dispatch(onInitReceivedDebt(response.data))
      }

    });
  }, [dispatch, userInfo.id]);

  useEffect(() => {
    socket.on(removeCreatedDebtReminder, (data) => {
      if (userInfo.id === data.receiverId){
        setNotification(`Một yêu cầu thanh toán nợ ${data.amount} VND vừa được xóa bởi bởi ${data.actionTakerName}`)
        socket.emit(findAllReceivedDebtReminder, {userId : data.receiverId})
        socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
      }
    });
  }, [userInfo.id]);

  useEffect(() => {
    socket.on(removeReceivedDebtReminder, (data) => {
      if (userInfo.id === data.userId){
        setNotification(`Một yêu cầu thanh toán nợ ${data.amount} VND vừa được xóa bởi bởi ${data.actionTakerName}`)
        socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
        socket.emit(findAllReceivedDebtReminder, {userId : data.receiverId})
      }
    });
  }, [userInfo.id]);

  useEffect(() => {
    console.log(debtReminder);
  },[debtReminder])

  useEffect(() => {
    console.log(debtReceived);
  },[debtReceived])
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={4} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <div>
                <AddDebtReminder/>
              </div>
              <div>Danh sách nợ do người dùng tạo</div>
              <div>
                <DebtReminderList debtReminders = {debtReminder.debtReminders} type = {CREATED_DEBT}/>
              </div>
              <div>Danh sách nợ do người khác tạo</div>
              <div>
                <DebtReminderList debtReminders = {debtReceived.debtReceived} type = {RECEIVED_DEBT}/>
              </div>
              <div>
                <div > Thong bao nhac no </div>
                <p>{notification}</p>
                <button onClick={() => setNotification("")}>Ok</button>
                <button>Xem</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
