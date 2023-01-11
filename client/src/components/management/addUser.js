import React, { useEffect, useState } from "react";

import { fetcherAddAccount } from "../../fetchers/fetcherAdmin";
const AddUser = (props) => {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [isDisable, setIsDisable] = useState(true)
    const resetState = () => {

    }

    async function addAccount(data) {
        const list = await fetcherAddAccount(data);
    }

    useEffect(() => {
        if (name !== undefined && username !== undefined && phone !== undefined && email !== undefined &&
            name !== "" && username !== "" && phone !== "" && email !== ""
        ) {
            setIsDisable(false)
        }
        else {
            setIsDisable(true)
        }
    }, [name, username, phone, email]);

    const handleXClick = (e) => {
        resetState()
        props.onClose();
    };

    const handleCancelClick = (e) => {
        resetState()
        props.onClose();
    };
    const handleSaveClick = (e) => {
        console.log(name, username, phone, email)
        const data = {
            "name": name,
            "username": username,
            "phone": phone,
            "email": email,
            "role": "employee"
        }
        addAccount(data)
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
                    Thêm nhân viên
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                    Tên đăng nhập
                </div>
                <div className="flex flex-col mb-4 px-8">
                    <input
                        className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Nhập số tài khoản"
                    />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                    Email
                </div>
                <div className="flex flex-col mb-4 px-8">
                    <input
                        className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Nhập email"
                    />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                    Họ và tên
                </div>
                <div className="flex flex-col mb-4 px-8">
                    <input
                        className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        required
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nhập họ và tên"
                    />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                    Số điện thoại
                </div>
                <div className="flex flex-col mb-4 px-8">
                    <input
                        className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="tel"
                        required
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Nhập SDT"
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
export default AddUser;
