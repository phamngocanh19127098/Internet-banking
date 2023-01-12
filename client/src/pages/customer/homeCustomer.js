import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeNavigation from "../../components/homeNavigation";
import { useSelector } from "react-redux";
import CloseAccCustomer from "../../components/closeAccCustomer";
import { fetcherAccounts } from "../../fetchers/fetcherCustomer";

const HomeCustomer = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usernameDelete, setUsernameDelete] = useState();
  const [account, setAccount] = useState({});

  const { userInfo } = useSelector((state) => state.auth);

  async function getAccount() {
    const list = await fetcherAccounts(userInfo.id);
    setAccount(list.data.data.accounts[0]);
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
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
              <div className="text-center text-main-green font-semibold text-lg duration-200">
                Số tài khoản:
              </div>
              <div className="text-cente text-main-green font-bold text-2xl duration-200 mb-6">
                {account.accountNumber}
              </div>
              <div className="text-center text-main-green font-bold text-lg duration-200">
                Số dư hiện tại:
              </div>
              <div className="text-cente text-main-green font-bold text-2xl duration-200">
                {numberWithCommas(account.currentBalance)} VND
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
                <Link
                  className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                  to="/payment"
                >
                  Chuyển khoản
                </Link>
              </div>
              <div className="my-6">
                <Link
                  className=" font-medium text-lg text-main-green border-2 border-main-green rounded-xl p-3 m-3 hover:bg-new-green hover:text-white"
                  to="/unpaid-loan"
                >
                  Danh sách nợ chưa thanh toán
                </Link>
                <Link
                  className=" font-medium text-lg text-rose-500 border-2 border-rose-500 rounded-xl p-3 m-3 hover:bg-rose-600 hover:text-white"
                  onClick={() => {
                    setShowDeleteModal(true);
                    console.log("userInfo", userInfo);
                    setUsernameDelete(userInfo.username);
                  }}
                >
                  Đóng tài khoản
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <CloseAccCustomer visible={showDeleteModal} username={usernameDelete} />
      )}
    </div>
  );
};

export default HomeCustomer;
