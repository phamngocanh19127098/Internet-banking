import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "../components/homeNavigation";
import AddRecipent from "../components/addRecipent";
import { fetcherListReceivers } from "../fetchers/fetcherCustomer";
import DeleteRecipent from "../components/deleteRecipent";
import EditRecipent from "../components/editRecipent";
import Loader from "../components/loading";
const ListRecipents = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [accNum, setAccNum] = useState();
  const [listRecipents, setListRecipents] = useState([{}]);

  async function getList() {
    const list = await fetcherListReceivers(userInfo.id);
    setListRecipents(list.data.data);
  }
  useEffect(() => {
    console.log(listRecipents);
  }, [listRecipents]);
  useEffect(() => {
    getList();
  }, []);

  const handleAccount = (e) => {
    setAccNum(e.target.value);
    console.log(e.target.value);
  };

  const handleXClick = (e) => {
    props.onClose();
  };
  const handleCancelClick = (e) => {
    props.onClose();
  };

  const handleSaveClick = (e) => {
    console.log(accNum);
    props.handleAccNum(accNum);
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
        {listRecipents !== null ? (
          <div>
            <label
              htmlFor="accounts"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Chọn tài khoản thanh toán nguồn
            </label>
            <select
              id="accounts"
              value={accNum}
              onChange={handleAccount}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {listRecipents !== null
                ? listRecipents.map((account, index) => (
                    <option value={account.beneficiaryAccountNumber}>
                      {account.beneficiaryNickname}
                    </option>
                  ))
                : null}
            </select>
          </div>
        ) : null}
        <div className="flex justify-end pb-4 px-8">
          <button
            id="handlecancel"
            onClick={handleCancelClick}
            className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded bg-[#FFFFFF] hover:bg-[#F3F4F6] bg-white"
          >
            Cancel
          </button>
          <button
            id="handleSave"
            onClick={handleSaveClick}
            className="cursor-pointer rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListRecipents;
