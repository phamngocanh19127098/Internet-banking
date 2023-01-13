import React, { useState } from "react";
import {
  createDebtReminderSocket,
  findAllCreatedDebtReminder,
} from "../constants/debtReminderConstants";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { socketOption } from "../config/socket-option";
const socket = io.connect(
  "http://localhost:3001",
  socketOption
);

const AddDebtReminder = (props) => {
  const [accountDesNumber, setAccountDesNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const handleCancelClick = (e) => {
    // resetState()
    props.onClose();
  };
  const createDebtReminderHandler = (e) => {
    e.preventDefault();

    socket.emit(createDebtReminderSocket, {
      accountDesNumber: accountDesNumber,
      amount,
      userId: userInfo.id,
      description: description,
    });
    setTimeout(() => {
      socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
    }, 2000);
    socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
    socket.emit(findAllCreatedDebtReminder, { userId: userInfo.id });
    props.onClose();
  };
  return (
    // <div>
    //   <form action="" onSubmit={createDebtReminderHandler}>
    //     <div>
    //       <label htmlFor="">so tai khoan</label>
    //       <input
    //         value={accountDesNumber}
    //         onChange={(e) => {
    //           setAccountDesNumber(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">so tien</label>
    //       <input
    //         value={amount}
    //         onChange={(e) => {
    //           setAmount(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="">Nhập lời nhắn</label>
    //       <input
    //         value={description}
    //         onChange={(e) => {
    //           setDescription(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="rounded-sm ring-2 ring-grey cursor-pointer"
    //     >
    //       tao nhac no
    //     </button>
    //   </form>
    // </div>
    <div className="fixed inset-0  z-10 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5 ">
        <button
          id="handleX"
          onClick={handleCancelClick}
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
          Thêm nhắc nợ mới
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Số tài khoản
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="accNum"
            type="tel"
            required
            value={accountDesNumber}
            onChange={(e) => {
              setAccountDesNumber(e.target.value);
            }}
            placeholder="Nhập số tài khoản"
          />
        </div>
        {/*<div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">*/}
        {/*  {notification}*/}
        {/*</div>*/}
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên người sở hữu tài khoản
        </div>
        <div className="flex flex-col mb-4 px-8">
          <div className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
            "Hàm get tên người nhận"
          </div>
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Số tiền cần thanh toán
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            required
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Nhập số tiền cần thanh toán"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Ghi chú
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="des"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Nhập ghi chú"
          />
        </div>
        <div className="flex justify-end pb-4 px-8">
          <button
            id="handlecancel"
            onClick={handleCancelClick}
            className=" cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded hover:bg-[#F3F4F6] bg-white"
          >
            Huỷ
          </button>
          <button
            id="handleSave"
            onClick={createDebtReminderHandler}
            className=" rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDebtReminder;
