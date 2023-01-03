import React, {useEffect, useState} from "react";
import HomeNavigation from '../components/homeNavigation';
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {createDebtReminderSocket, findAllCreatedDebtReminder} from "../constants/debtReminderConstants";
import {onInit} from "../features/debtReminder/debtReminderSlice";
const socket = io.connect("http://localhost:3001");

const Loan = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const debtReminder = useSelector((state) => state.debtReminder)
  const dispatch = useDispatch()
  const [accountDesNumber, setAccountDesNumber] = useState("");
  const [amount, setAmount] = useState("");
  const createDebtReminderHandler = (e) => {
    e.preventDefault()

    socket.emit(createDebtReminderSocket, {
      accountDesNumber : accountDesNumber,
      amount,
      userId : userInfo.id,
      description: 'giup tui them field'}
    )
  }
  useEffect(() => {
    socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
  }, [userInfo.id])

  useEffect(() => {
    socket.on(findAllCreatedDebtReminder, (data) => {
      dispatch(onInit(data))
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on(createDebtReminderSocket, (data) => {
      console.log(data)
    });
  }, []);

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={4} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <form action="" onSubmit={createDebtReminderHandler}>
                <div>
                  <label htmlFor="">so tai khoan</label>
                  <input value={accountDesNumber} onChange={(e) => {setAccountDesNumber(e.target.value)}}/>
                </div>
                <div>
                  <label htmlFor="">so tien</label>
                  <input value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
                </div>
                <button type="submit" className="rounded-sm ring-2 ring-grey">
                  tao nhac no
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
