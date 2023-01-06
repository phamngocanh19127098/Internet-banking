import React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetcherReceiver } from '../../fetchers/fetcherCustomer';
import { fetcherAllList, fetcherDebtList, fetcherReceivedList, fetcherTransferList } from '../../fetchers/fetcherEmployee';
import EmployeeNavigation from '../../components/employeeNavigation';
import AllListTransaction from '../../components/listTransaction/allList';
import TransferListTransaction from '../../components/listTransaction/transferList';
const SeeTransactions = () => {
    const [allList, setAllList] = useState([])
    const [receivedList, setReceivedList] = useState([])
    const [transferList, setTransferList] = useState([])
    const [debtList, setDebtList] = useState([])
    const [accNum, setAccNum] = useState()
    const [notification, setNotification] = useState("");
    const [name, setName] = useState("")
    const [isDisable, setIsDisable] = useState(true);
    const [response, setResponse] = useState();
    const [statuscode, setStatuscode] = useState(404);
    async function getName() {
        const info = await fetcherReceiver(accNum);
        setStatuscode(info.status);
        setResponse(info);
    }

    async function getAllList() {
        const info = await fetcherAllList(accNum);
        setAllList(info.data.data);
    }

    async function getTransferList() {
        const info = await fetcherTransferList(accNum);
        setTransferList(info.data.data);
    }


    useEffect(() => {
        console.log(accNum);
        if (accNum !== null) {
            getName();
        }
    }, [accNum]);

    useEffect(() => {
        if (statuscode === 200) {
            if (accNum !== null) {
                setName(response.data.data.user.name);
                setNotification(response.data.data.user.name);
                setIsDisable(false);
            } else {
                setNotification("");
                setName(" ");
                setIsDisable(true);
            }
        } else {
            if (accNum !== null && accNum !== "") {
                setNotification("Số tài khoản chưa chính xác");
                setName("");
                setIsDisable(true);
            } else {
                setNotification("");
                setName("");
                setIsDisable(true);
            }
        }
    }, [statuscode]);

    const submitForm = () => {
        console.log(accNum)
        getAllList()
        getTransferList()
    };
    const [openTab, setOpenTab] = useState(1);
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <EmployeeNavigation id={3} />
                    <div className="h-screen flex-auto">
                        <div
                            className=" m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300  "
                        >
                            <div className='grid grid-cols-4 gap-4'>
                                <div className='col-span-1'>
                                    <div className="flex  text-xl  text-black font-bold  px-8 ">
                                        Số tài khoản
                                    </div>
                                    <div className="flex flex-col mb-4 px-10">
                                        <input
                                            className=" appearance-none p-3  shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                                            id="username"
                                            type="text"
                                            required
                                            value={accNum}
                                            onChange={(event) => setAccNum(event.target.value)}
                                            placeholder="Nhập số tài khoản"
                                        />
                                        <div className="flex  text-xs  text-red font-bold mb-2 mt-4 px-8 ">
                                            {notification}
                                        </div>                              <button
                                            disabled={isDisable}
                                            onClick={submitForm}
                                            className=" button  flex flex-col mb-4 px-8 py-2  tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#076F32] hover:to-[#076F32] disabled:opacity-25 cursor-pointer rounded-lg"
                                        >
                                            Tra cứu giao dịch tài khoản
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center justify-items-center container mx-auto col-span-3 ">
                                    <div className="flex flex-col items-center justify-center max-w-xl">
                                        <ul className="flex space-x-2">
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(1)}
                                                    className={` ${openTab === 1 ? "bg-main-green text-white " : "text-gray-600 bg-white"} inline-block px-4 py-2 rounded shadow`}
                                                >
                                                    Tất cả giao dịch
                                                </div>
                                            </li>
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(2)}
                                                    className={` ${openTab === 2 ? "bg-main-green text-white " : " text-gray-600 bg-white "} inline-block px-4 py-2  rounded shadow`}


                                                >
                                                    Chuyển tiền
                                                </div>
                                            </li>
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(3)}
                                                    className={` ${openTab === 3 ? "bg-main-green text-white" : " text-gray-600 bg-white "} inline-block px-4 py-2  rounded shadow`}


                                                >
                                                    Nhận tiền
                                                </div>
                                            </li>

                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(4)}
                                                    className={` ${openTab === 4 ? "bg-main-green text-white" : " text-gray-600 bg-white "} inline-block px-4 py-2 rounded shadow`}


                                                >
                                                    Trả nợ
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="p-3 mt-6 max-h-screen  ">
                                            <div className={` ${openTab === 1 ? "block" : "hidden"}`}>
                                                <AllListTransaction allList={allList} accNum={accNum} />
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"}>
                                                <TransferListTransaction allList={transferList} />
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"}>
                                                <AllListTransaction allList={allList} accNum={accNum} />
                                            </div>
                                            <div className={openTab === 4 ? "block" : "hidden"}>
                                                <AllListTransaction allList={allList} accNum={accNum} />
                                            </div>
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
}


export default SeeTransactions;