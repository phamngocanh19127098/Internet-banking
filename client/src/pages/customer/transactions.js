import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "../../components/homeNavigation";
import ReceivedListTransaction from "../../components/listTransaction/receivedList";
import { useState } from "react";
import { fetcherAccounts } from "../../fetchers/fetcherCustomer";
import { fetcherTransferList } from "../../fetchers/fetcherEmployee";
import { fetcherAllList } from "../../fetchers/fetcherEmployee";
import AllListTransaction from "../../components/listTransaction/allList";
import TransferListTransaction from "../../components/listTransaction/transferList";
import {
  fetcherReceivedList,
  fetcherDebtList,
} from "../../fetchers/fetcherEmployee";
import DebtListTransaction from "../../components/listTransaction/debtList";
import { fetcherListBanks } from "../../fetchers/fetcherCustomer";
const Transaction = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [checkAccs, setCheckAccs] = useState();
  const [accNum, setAccNum] = useState();
  const [allList, setAllList] = useState([])
  const [receivedList, setReceivedList] = useState([])
  const [transferList, setTransferList] = useState([])
  const [debtList, setDebtList] = useState([])
  const [listBank, setListBank] = useState()
  async function getBanks() {
    const list = await fetcherListBanks();
    setListBank(list.data.data);
  }

  async function getListAcc() {
    const list = await fetcherAccounts(userInfo.id);
    setCheckAccs(list.status);
    setAccNum(list.data.data.accounts[0].accountNumber);
  }

  async function getAllList() {
    const info = await fetcherAllList(accNum);
    setAllList(info.data.data);
  }

  async function getTransferList() {
    const info = await fetcherTransferList(accNum);
    setTransferList(info.data.data);
  }

  async function getReceivedList() {
    const info = await fetcherReceivedList(accNum);
    setReceivedList(info.data.data);
  }

  async function getDebtList() {
    const info = await fetcherDebtList(accNum);
    setDebtList(info.data.data);
  }

  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    if (checkAccs === 200) {
      getAllList();
      getTransferList();
      getReceivedList();
      getDebtList();
      getBanks();
    }
  }, [checkAccs]);

  useEffect(() => {
    getListAcc();
  }, []);

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={8} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <div className="flex justify-center justify-items-center container mx-auto col-span-3 ">
                <div className="flex flex-col items-center justify-center max-w-xl">
                  <ul className="flex space-x-2">
                    <li>
                      <div
                        onClick={() => setOpenTab(1)}
                        className={` ${openTab === 1
                            ? "bg-main-green text-white "
                            : "text-gray-600 bg-white"
                          } inline-block px-4 py-2 rounded shadow`}
                      >
                        Tất cả giao dịch
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={() => setOpenTab(2)}
                        className={` ${openTab === 2
                            ? "bg-main-green text-white "
                            : " text-gray-600 bg-white "
                          } inline-block px-4 py-2  rounded shadow`}
                      >
                        Chuyển tiền
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={() => setOpenTab(3)}
                        className={` ${openTab === 3
                            ? "bg-main-green text-white"
                            : " text-gray-600 bg-white "
                          } inline-block px-4 py-2  rounded shadow`}
                      >
                        Nhận tiền
                      </div>
                    </li>

                    <li>
                      <div
                        onClick={() => setOpenTab(4)}
                        className={` ${openTab === 4
                            ? "bg-main-green text-white"
                            : " text-gray-600 bg-white "
                          } inline-block px-4 py-2 rounded shadow`}
                      >
                        Trả nợ
                      </div>
                    </li>
                  </ul>
                  <div className="p-3 mt-6 max-h-screen grid-rows-4  ">
                    <div className={`${openTab === 1 ? "block" : "hidden"}`}>
                      <AllListTransaction allList={allList} accNum={accNum} banks={listBank} />
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"}>
                      <TransferListTransaction allList={transferList} banks={listBank} />
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"}>
                      <ReceivedListTransaction allList={receivedList} banks={listBank} />
                    </div>
                    <div className={openTab === 4 ? "block" : "hidden"}>
                      <DebtListTransaction allList={debtList} banks={listBank} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
