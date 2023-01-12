import React, { useState } from "react";
import { fetcherEditReceiver } from "../fetchers/fetcherCustomer";
const EditRecipent = (props) => {
  const [nickname, setNickName] = useState("");

  async function editRecipent() {
    await fetcherEditReceiver(
      props.editInfo.id,
      nickname,
      props.editInfo.name,
      props.editInfo.accNum
    );
  }

  const handleXClick = (e) => {
    props.onClose();
  };

  const handleCancelClick = (e) => {
    props.onClose();
  };

  const handleSaveClick = (e) => {
    if (nickname === "") {
      setNickName(props.editInfo.name);
    }
    editRecipent();
    props.handleChange();
    props.onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
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
          Chỉnh sửa tên người nhận
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên người sở hữu tài khoản
        </div>
        <div className="flex flex-col mb-4 px-8">
          <div className="appearance-none p-3 shadow rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
            {props.editInfo.name}
          </div>
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên nhận biết
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="appearance-none p-3 shadow rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            type="text"
            defaultValue={props.editInfo.nickname}
            onChange={(event) => setNickName(event.target.value)}
            placeholder="Nhập tên nhận biết"
          />
        </div>
        <div className="flex justify-end pb-4 px-8">
          <button
            id="handlecancel"
            onClick={handleCancelClick}
            className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded hover:bg-[#F3F4F6] bg-white"
          >
            Huỷ
          </button>
          <button
            id="handleSave"
            onClick={handleSaveClick}
            className="cursor-pointer rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditRecipent;
