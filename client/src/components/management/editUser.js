import React, { useState } from "react";
import { fetcherEditManagement } from "../../fetchers/fetcherAdmin";

const EditUser = (props) => {
  const [name, setName] = useState(props.info.name);
  const [phone, setPhone] = useState(props.info.phone);
  const [dob, setDob] = useState(props.info.dob);
  const [address, setAddress] = useState(props.info.address);
  const [email, setEmail] = useState(props.info.email);

  async function editAccount(data) {
    await fetcherEditManagement(props.info.id, data);
  }

  const handleRemoveClick = (e) => {
    const data = {
      name: name,
      phone: phone,
      dob: dob,
      address: address,
      email: email,
      status: props.info.status,
      role: props.info.role,
    };
    editAccount(data);
    setTimeout(() => {
      props.handleChange();
      props.onClose();
    }, 500);
  };
  const handleCancelClick = (e) => {
    props.onClose();
  };
  const handleXClick = (e) => {
    props.onClose();
  };

  if (!props.visible) return null;
  return (
    <div className="fixed inset-0 z-auto bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5">
        <button
          id="handleX"
          onClick={handleXClick}
          className="-right-6 -top-6 absolute flex justify-end rounded-full px-4 py-4 ml-4 text-white font-bold bg-black"
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
        <div className="flex  text-lg  text-black font-bold pt-4 px-8 border-b-2 border-b-gray-100">
          Chỉnh sửa tài khoản
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Tên
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="shadow appearance-none p-3 rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            defaultValue={props.info.name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nhập tên"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Ngày sinh
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="shadow appearance-none p-3 rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="dob"
            type="text"
            defaultValue={props.info.dob}
            onChange={(event) => setDob(event.target.value)}
            placeholder="Nhập ngày sinh"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Điện thoại
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="shadow appearance-none p-3 rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            defaultValue={props.info.phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Nhập SDT"
          />
        </div>
        <div className="flex text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Địa chỉ
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="shadow appearance-none p-3 rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            defaultValue={props.info.address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Nhập tên"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          Email
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className="shadow appearance-none p-3 rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            defaultValue={props.info.email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Nhập Email"
          />
        </div>
        <div className="flex justify-end pb-4 px-8">
          <button
            id="handlecancel"
            onClick={handleCancelClick}
            className="px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded bg-[#FFFFFF] hover:bg-[#F3F4F6]"
          >
            Hủy bỏ
          </button>
          <button
            id="handleRemove"
            onClick={handleRemoveClick}
            className="rounded px-2 py-2 ml-4 text-white  text-xs font-bold bg-[#EA580C] hover:bg-[#cf4a04] disabled:bg-[#edb395]"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
