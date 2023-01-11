import React from "react";
import { Link } from "react-router-dom";
import HomeNavigation from "../../components/homeNavigation";
import { useSelector } from "react-redux";

const HomeCustomer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={0} />
          <div className="h-screen flex-auto">
            <div className="grid grid-rows-3 grid-cols-3 gap-4 m-10 w-200 bg-[#F0F2FF] rounded-sm  h-[90%] relative duration-300">
              <div className="row-span-1 col-span-1 ring-2 ring-main-green rounded flex flex-col justify-center items-center ">
                <div className="px-7 text-center text-main-green font-medium text-bold text-2xl duration-200">
                  <div className=" font-semibold">Chào mừng</div>
                  <div className=" font-bold">{userInfo.name}</div>
                  <div className=" font-semibold">đến với Taixiu Bank</div>
                </div>
              </div>
              <div className="row-span-1 col-span-1 ring-2 ring-main-green rounded flex flex-col justify-center items-center">
                <div className="text-center text-main-green font-medium  text-sm duration-200">
                  Số dư hiện tại
                </div>
                <div className="text-center text-main-green font-medium text-bold text-2xl duration-200">
                  3.000.000 VND
                </div>
              </div>
              <div className="row-span-2 col-span-2 rounded flex flex-col items-center mt-6">
                <div className="my-6">
                  <Link
                    className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                    to="/accounts"
                  >
                    Danh sách tài khoản
                  </Link>
                  <Link
                    className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                    to="/recipents"
                  >
                    Danh sách người nhận
                  </Link>
                </div>
                <div className="my-6">
                  <Link
                    className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                    to="/payment"
                  >
                    Chuyển khoản
                  </Link>
                  <Link
                    className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                    to="/loan"
                  >
                    Ghi nợ
                  </Link>
                  <Link
                    className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                    to="/unpaid-loan"
                  >
                    Danh sách nợ chưa thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomer;
