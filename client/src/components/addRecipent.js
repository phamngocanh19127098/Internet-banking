import React, { useEffect, useState } from "react";
import { fetcherAddAffiliatedBank, fetcherReceiver } from "../fetchers/fetcherCustomer";
import { fetcherAddReceiver } from "../fetchers/fetcherCustomer";
import { fetcherGetInfo } from "../fetchers/fetcherCustomer";
const AddRecipent = (props) => {
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [accNum, setAccNum] = useState("");
  const [statuscode, setStatuscode] = useState(404);
  const [notification, setNotification] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [result, setResult] = useState();
  const [listBank, setListBank] = useState(props.banks);
  const [value, setValue] = useState(props.banks[0].id);
  const a = { "id": "", "name": "TaiXiu Bank" }
  useEffect(() => {
    setListBank([...listBank, a])
  }, []);
  async function getName() {
    const info = await fetcherGetInfo(accNum, value);
    setStatuscode(info.status);
    setName(info.data.data.user.name);
  }

  async function addNewRecipent() {
    const info = await fetcherAddReceiver(accNum, nickname);
    setResult(info.status);
  }
  async function addNewRecipentOtherBank() {
    const info = await fetcherAddAffiliatedBank(accNum, name, nickname, parseInt(value));
    setResult(info.status);
  }
  const resetState = () => {
    setListBank([])
    setName("")
    setAccNum("")
  }
  const handleXClick = (e) => {
    resetState()
    props.onClose();
  };
  useEffect(() => {
    getName()
  }, [value]);
  useEffect(() => {
    if (nickname === "") console.log(true);
    if (statuscode === 201) {
      if (accNum !== null) {
        setNotification(name);
        setIsDisable(false);
      } else {
        setNotification("");
        setName(" ");
        setIsDisable(true);
      }
    } else {
      if (accNum !== "") {
        setNotification("Số tài khoản không tồn tại");
        setName("");
        setIsDisable(true);
      } else {
        setNotification("");
        setName("");
        setIsDisable(true);
      }
    }
  }, [statuscode]);
  useEffect(() => {
    console.log(accNum, value);
    if (accNum !== null) {
      getName();
    }
  }, [accNum]);

  const handleCancelClick = (e) => {
    resetState()
    props.onClose();
  };

  const handleChangeSelect = (e) => {
    console.log(e.target.value)
    setValue(e.target.value);
  };

  const handleSaveClick = (e) => {
    if (nickname === "") {
      setNickName(name);
    }
    if (value !== "") {
      addNewRecipentOtherBank()
    }
    else {
      addNewRecipent();
    }

    resetState()
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
          Thêm người nhận
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Ngân hàng
        </div>
        <div className="flex flex-col mb-4 px-8">
          <div className="border  border-[#001B3A] select-container">
            <select value={value} onChange={handleChangeSelect} >
              {listBank.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
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
            onChange={(event) => setAccNum(event.target.value)}
            placeholder="Nhập số tài khoản"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          {notification}
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên người sở hữu tài khoản
        </div>
        <div className="flex flex-col mb-4 px-8">
          <div className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
            {name}
          </div>
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên nhận biết
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            type="text"
            onChange={(event) => setNickName(event.target.value)}
            placeholder="Nhập tên nhận biết"
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
            onClick={handleSaveClick}
            disabled={isDisable}
            className=" rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddRecipent;
