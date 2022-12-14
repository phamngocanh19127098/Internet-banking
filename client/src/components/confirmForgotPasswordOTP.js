import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetcherVerifyOTP } from "../fetchers/authen";
import Loader from "./loading";

const ConfirmForgotPasswordOTP = (props) => {
  const [OTP, setOTP] = useState("");
  const [statuscode, setStatuscode] = useState(404);
  const [notification, setNotification] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const navigate = useNavigate();

  async function verifyOTP() {
    const info = await fetcherVerifyOTP(props.username, OTP);
    console.log("info", info);

    setIsLoading(false);

    if (!!info) {
      setStatuscode(info.data.statusCode);
    }
  }

  const handleXClick = (e) => {
    props.onClose();
  };

  useEffect(() => {
    if (OTP !== null) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [OTP]);

  useEffect(() => {
    if (statuscode === 200) {
      props.onClose();
      alert("Mật khẩu của bạn đã gửi về email bạn đã đăng ký");
      navigate("/");
    } else {
      setIsLoading(false);
      setNotification("Mã OTP chưa chính xác");
    }
  }, [statuscode]);

  const handleCancelClick = (e) => {
    props.onClose();
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSaveClick = (e) => {
    verifyOTP();
    setIsLoading(true);
  };

  if (isLoading)
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
          <Loader />
        </div>
      </div>
    );

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
          Mời bạn nhập mã OTP
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          OTP
        </div>
        <div className="flex flex-col mb-4 px-8">
          <input
            className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
            id="OTP"
            type="tel"
            required
            onChange={(event) => setOTP(event.target.value)}
            placeholder="Nhập mã OTP"
          />
        </div>
        <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
          {notification}
        </div>
        <div className="flex justify-end pb-4 px-8">
          <button
            id="handlecancel"
            onClick={handleCancelClick}
            className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] roundedhover:bg-[#F3F4F6] bg-white"
          >
            Huỷ
          </button>
          <button
            id="handleSave"
            onClick={handleSaveClick}
            disabled={isDisable}
            className="cursor-pointer rounded px-4 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
          >
            Gửi OTP
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmForgotPasswordOTP;
