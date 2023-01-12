import React from "react";
import { Link } from "react-router-dom";

const SuccessModal = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-auto bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5">
        <div className="flex text-lg text-black font-bold pt-4 px-8 border-b-2 border-b-gray-100">
          Tạo tài khoản
        </div>
        <div className="flex  text-sm  text-black mb-2 mt-4 px-8 ">
          Tạo tài khoản cho khách hàng {props.name} với tên đăng nhập{" "}
          {props.username} thành công!
        </div>
        <div className="flex justify-end pb-4 px-8">
          <Link to="/addAccount">
            <button
              id="handlecancel"
              className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded hover:bg-main-green bg-new-green"
            >
              Tạo tài khoản khác
            </button>
          </Link>
          <Link to="/employee">
            <button
              id="handleRemove"
              className=" cursor-pointer rounded px-2 py-2 ml-4 text-white  text-xs font-bold bg-darkblue hover:bg-[#cf4a04] disabled:bg-[#edb395] "
            >
              Về trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SuccessModal;
