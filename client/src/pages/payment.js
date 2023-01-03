import React, { useEffect, useState } from 'react';
import HomeNavigation from '../components/homeNavigation';
import { useSelector } from 'react-redux'
import { fetcherAccounts } from '../fetchers/fetcherCustomer';
import { fetcherReceiver } from '../fetchers/fetcherCustomer';
import CurrencyInput from 'react-currency-input-field';
import ListRecipents from '../components/listRecipent';
import { fetcherSendTransfer } from '../fetchers/fetcherCustomer';
import ConfirmOTP from '../components/confirmOTP';

const Payment = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [listAccounts, setListAccounts] = useState([{}])
    const [name, setName] = useState("")
    const [accNum, setAccNum] = useState("")
    const [statuscode, setStatuscode] = useState(404)
    const [notification, setNotification] = useState('')
    const [rootNum, setRootNum] = useState();
    const [isDisable, setIsDisable] = useState(true)
    const [money, setMoney] = useState()
    const [showAddModal, setShowAddModal] = useState(false);
    const handleOnCloseAdd = () => setShowAddModal(false)

    const [showOTPModal, setShowOTPModal] = useState(false);
    const handleOnCloseOTP = () => setShowOTPModal(false)

    const [description, setDescription] = useState("")
    const [result, setResult] = useState()
    const [transactionId, setTransactionId] = useState()

    const [response, setResponse] = useState()

    const [infoSuccess, setInfoSuccess] = useState()

    const [isSuccess, setIsSuccess] = useState(false)

    async function getName() {
        const info = await fetcherReceiver(accNum)
        setStatuscode(info.status)
        setResponse(info)
    }


    async function sendReqTransfer() {
        const info = await fetcherSendTransfer(accNum, parseInt(money), description)
        setResult(info.data)

    }

    const handleChange = (e) => {
        setRootNum(e.target.value);
        console.log(e.target.value)
    };

    async function getList() {
        const list = await fetcherAccounts(userInfo.id)
        setListAccounts(list.data.data.accounts)
    }

    useEffect(() => {
        getList()
    }, []);

    useEffect(() => {
        console.log(rootNum)
    }, rootNum);

    useEffect(() => {
        if (listAccounts !== [{}]) {
            setRootNum(listAccounts[0].accountNumber)
        }
    }, [listAccounts]);


    useEffect(() => {
        if (statuscode === 200) {
            if (accNum !== null) {
                setName(response.data.data.user.name)
                setNotification(response.data.data.user.name)
                setIsDisable(false)
            }
            else {
                setNotification("")
                setName(" ")
                setIsDisable(true)
            }
        } else {
            if ((accNum !== null) && (accNum !== "")) {
                setNotification("Số tài khoản chưa chính xác")
                setName("")
                setIsDisable(true)
            }
            else {
                setNotification("")
                setName("")
                setIsDisable(true)
            }
        }
    }, [statuscode]);
    useEffect(() => {
        console.log(accNum)
        if (accNum !== null) {
            getName()
        }
    }, [accNum])


    useEffect(() => {
        console.log(result)
        if (result) {
            if (result.statusCode === 200) {
                setTransactionId(result.data.id)
                setShowOTPModal(true)
            }
        }
    }, [result]);

    const handleTransfer = () => {
        console.log("CHECK")
        console.log(rootNum)
        console.log(name)
        console.log(money)
        console.log(description)
        sendReqTransfer()
    }

    if (isSuccess == true) {
        return (
            <div>
                <div>
                    <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                        <HomeNavigation id={3} />
                        <div className="h-screen flex-auto">
                            <div
                                className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                            >
                                <div className="block mb-2 text-xl text-gray-900 dark:text-white font-bold">Thực hiện giao dịch chuyển khoản thành công</div>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Tên người chuyển khoản: {userInfo.name}</div>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Tên người người nhận: {name}</div>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >STK người nhận: {accNum}</div>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Số tiền: {money}</div>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Nội dung: {description}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={3} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <label htmlFor="accounts" className="block mb-2 text-sm text-gray-900 dark:text-white font-bold">Chọn tài khoản thanh toán nguồn</label>
                            <select value={rootNum} onChange={handleChange} id="accounts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {listAccounts !== null ?
                                    listAccounts.map((account, index) => (
                                        <option value={account.accountNumber}>{account.accountNumber}</option>
                                    ))
                                    : null}
                            </select>
                            <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Số tài khoản người nhận</div>
                            <div className="flex flex-col mb-4 px-8">
                                <input className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                                    id="accNum"
                                    type="tel"
                                    required
                                    value={accNum}
                                    onChange={event => setAccNum(event.target.value)}
                                    placeholder="Nhập số tài khoản" />
                            </div>
                            <div className="flex  text-xs  text-red font-bold mb-2 mt-4 px-8 " >{notification}</div>
                            <div className=" text-xs  text-black inline font-bold mb-2 mt-4 px-8 " >Tên người sở hữu tài khoản</div>
                            <div type="button" onClick={() => {
                                setShowAddModal(true);
                            }} className=" text-xs  text-main-green inline font-bold mb-2 mt-4 px-8 " >Chọn trong danh sách có sẵn</div>
                            <div className="flex flex-col mb-4 px-8">
                                {!name ? <div className="shadow appearance-none border rounded flex p-5 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
                                </div> : <div className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
                                    {name}
                                </div>}
                            </div>
                            <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Mời nhập số tiền cần chuyển</div>
                            <div className="flex flex-col mb-4 px-8">
                                <CurrencyInput className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"

                                    id="input-example"
                                    name="input-name"
                                    placeholder="Please enter a number"
                                    //  defaultValue={1000}
                                    decimalsLimit={2}
                                    suffix=" VND"
                                    value={money}
                                    //onChange={event => setMoney(event.target, value)}
                                    onValueChange={(money) => setMoney(money)}
                                />

                            </div>

                            <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 " >Nội dung chuyển khoản</div>
                            <div className="flex flex-col mb-4 px-8">
                                <input className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    type="text"
                                    required
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    placeholder="Nhập nội dung" />
                            </div>
                            <button id="handleTransfer" onClick={handleTransfer} disabled={isDisable} className="rounded px-20 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "  >Chuyển khoản</button>
                        </div>
                    </div>
                    {showAddModal && <ListRecipents onClose={handleOnCloseAdd} visible={showAddModal} handleAccNum={setAccNum} />
                    }
                    {showOTPModal && <ConfirmOTP onClose={handleOnCloseOTP} visible={showOTPModal} transactionId={transactionId} handleSuccess={setIsSuccess}
                        infoSuccess={setInfoSuccess} />
                    }

                </div>
            </div>

        </div>

    );
}


export default Payment;
