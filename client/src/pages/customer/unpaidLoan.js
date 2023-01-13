import React, { useEffect } from "react";
import HomeNavigation from "../../components/homeNavigation";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  findAllUnPaidDebtReminder,
  payDebt,
} from "../../constants/debtReminderConstants";
import { onInitUnpaidDebtReminder } from "../../features/debtReminder/unpaidDebtReminder";
import { PAY_DEBT } from "../../constants/buttonType";
import DebtReminderList from "../../components/DebtReminderList";
import DebtList from "../../components/debt/DebtList";
import { socketOption } from "../../config/socket-option";
const socket = io.connect("http://localhost:3001", socketOption);

const UnPaidLoan = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const unpaidDebt = useSelector((state) => state.unpaidDebtReminder);

  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit(findAllUnPaidDebtReminder, { userId: userInfo.id });
  }, [userInfo.id]);

  useEffect(() => {
    socket.on(findAllUnPaidDebtReminder, (response) => {
      if (response.userId === userInfo.id) {
        dispatch(onInitUnpaidDebtReminder(response.data));
      }
    });
  }, [dispatch, userInfo.id]);

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={6} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey h-[90%] p-5 pt-8 relative duration-300">
              <DebtList
                height={128}
                debtReminders={unpaidDebt.unpaidDebtReminders}
                type={PAY_DEBT}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnPaidLoan;
