import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "../../components/homeNavigation";
import { useState } from "react";
import Loader from "../../components/loading";
import { fetcherListTransactions } from "../../fetchers/fetcherCustomer";
import { fetcherAccounts } from "../../fetchers/fetcherCustomer";
const Transaction = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [listTransactions, setListTransactions] = useState([]);
  const [listAccounts, setListAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkTrans, setCheckTrans] = useState();
  const [checkAccs, setCheckAccs] = useState();
  async function getListTrans(accNum) {
    const list = await fetcherListTransactions(accNum);
    setListTransactions(list.data.data);
    setCheckTrans(list.statusCode);
  }
  async function getListAcc() {
    const list = await fetcherAccounts(userInfo.id);
    setListAccounts(list.data.data.accounts);
    setCheckAccs(list.status);
  }

  useEffect(() => {
    if (checkAccs === 200) {
      getListTrans(listAccounts[0].accountNumber);
    }
    console.log(checkAccs);
    console.log(listAccounts);
  }, [checkAccs]);

  useEffect(() => {
    console.log(listTransactions);
  }, [checkTrans]);

  useEffect(() => {
    getListAcc();
  }, []);
  useEffect(() => {
    console.log(listTransactions);
  }, [listTransactions]);
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={8} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              {/* {listTransactions !== null ?
                                listTransactions.map((transaction) =>
                                    <div>
                                        {transaction.transactionType === "TRANSFER" && <div
                                            className="shadow appearance-none border rounded  p-3 shadow rounded bg-red text-sm font-medium  text-gray-800  items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <div className="text-xs block  text-black font-bold mb-2 mt-2 px-4 " >Chuyển đến số tài khoản: {transaction.accountDesNumber}</div>
                                            <div className="text-xs  text-black font-bold mb-2 mt-2 px-4 " >Số tiền: {transaction.amount}</div>
                                            <div className="text-xs  text-black font-bold mb-2 mt-2 px-4 " >Nội dung: {transaction.description}</div>
                                        </div>}

                                        {transaction.transactionType === "RECEIVE" && <div
                                            className="shadow appearance-none border rounded  p-3 shadow rounded bg-green text-sm font-medium  text-gray-800  items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <div className="text-xs block  text-black font-bold mb-2 mt-2 px-4 " >Nhận từ số tài khoản: {transaction.accountDesNumber}</div>
                                            <div className="text-xs  text-black font-bold mb-2 mt-2 px-4 " >Số tiền: {transaction.amount}</div>
                                            <div className="text-xs  text-black font-bold mb-2 mt-2 px-4 " >Nội dung: {transaction.description}</div>
                                        </div>}

                                    </div>
                                )

                                : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
