import React, { useEffect, useState } from "react";
import HomeNavigation from "../../components/homeNavigation";
import { useSelector } from "react-redux";
import { fetcherAccounts } from "../../fetchers/fetcherCustomer";
import CurrencyInput from "react-currency-input-field";
import ListRecipentsExternal from "../../components/listRecipentsExternal";
import ConfirmOTP from "../../components/confirmOTP";
import { fetcherAddReceiver } from "../../fetchers/fetcherCustomer";
import { fetcherListBanks } from "../../fetchers/fetcherCustomer";
import { fetcherGetInfo } from "../../fetchers/fetcherCustomer";
import { fetcherSendTransferExternal } from "../../fetchers/fetcherCustomer";
import { fetcherAddAffiliatedBank } from "../../fetchers/fetcherCustomer";
import Loader from "../../components/loading";
import { formatMoney } from "../../utils";

const Other = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [listAccounts, setListAccounts] = useState([{}]);
  const [name, setName] = useState("");
  const [accNum, setAccNum] = useState("");
  const [statuscode, setStatuscode] = useState(404);
  const [notification, setNotification] = useState("");
  const [rootNum, setRootNum] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [money, setMoney] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOnCloseAdd = () => setShowAddModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const handleOnCloseOTP = () => setShowOTPModal(false);
  const [value, setValue] = useState();
  const [listBank, setListBank] = useState();
  async function getBanks() {
    const list = await fetcherListBanks();
    setListBank(list.data.data);
  }

  const [description, setDescription] = useState("");
  const [result, setResult] = useState();
  const [transactionId, setTransactionId] = useState();

  const [response, setResponse] = useState();

  const [infoSuccess, setInfoSuccess] = useState();

  const [isSuccess, setIsSuccess] = useState(false);

  const [fee, setFee] = React.useState("DES");

  const handleChangeFee = (event) => {
    setFee(event.target.value);
    console.log(event.target.value);
  };

  async function getName() {
    const info = await fetcherGetInfo(accNum, value);
    setStatuscode(info.status);
    setResponse(info);
  }

  async function addNewRecipent(accSrcNumber, nickName) {
    await fetcherAddAffiliatedBank(
      accSrcNumber,
      nickName,
      nickName,
      parseInt(value)
    );
  }

  async function sendReqTransfer() {
    const info = await fetcherSendTransferExternal(
      accNum,
      parseInt(money),
      description,
      fee,
      value
    );
    setResult(info.data);
  }

  const handleChange = (e) => {
    setRootNum(e.target.value);
    console.log(e.target.value);
  };

  async function getList() {
    const list = await fetcherAccounts(userInfo.id);
    setListAccounts(list.data.data.accounts);
  }

  useEffect(() => {
    getBanks();
    getList();
  }, []);

  useEffect(() => {
    if (listBank !== undefined) {
      setValue(listBank[0].id);
    }
  }, [listBank]);

  const handleChangeSelect = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (listAccounts !== [{}]) {
      setRootNum(listAccounts[0].accountNumber);
    }
  }, [listAccounts]);

  useEffect(() => {
    console.log(response);
    if (statuscode === 201) {
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
  useEffect(() => {
    if (accNum !== null) {
      getName();
    }
  }, [accNum, value]);

  useEffect(() => {
    console.log(result);
    if (result) {
      if (result.statusCode === 200) {
        setTransactionId(result.data.id);
        setIsLoading(false);
        setShowOTPModal(true);
      } else {
        alert(result.error.message);
        setIsLoading(false);
      }
    }
  }, [result]);

  const resetState = () => {
    setAccNum("");
    setName("");
    setMoney("");
    setStatuscode(404);
    setNotification("");
    setShowAddModal(false);
    setIsSuccess(false);
  };

  const handleTransfer = () => {
    console.log("CHECK");
    console.log(rootNum);
    console.log(name);
    console.log(money);
    console.log(description);
    sendReqTransfer();
    setIsLoading(true);
  };

  const handleSave = () => {
    addNewRecipent(accNum, name);
    resetState();
  };
  if (isLoading)
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <HomeNavigation id={4} />
            <div className="h-screen flex-auto">
              <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (isSuccess === true) {
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <HomeNavigation id={4} />
            <div className="h-screen flex-auto">
              <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
                <div className="block mb-2 text-2xl text-gray-900 font-bold">
                  Thực hiện giao dịch chuyển khoản thành công
                </div>
                <div className="flex  text-xl  text-black font-bold mb-2 mt-4 px-8 ">
                  Tên người chuyển khoản: {userInfo.name}
                </div>
                <div className="flex  text-xl  text-black font-bold mb-2 mt-4 px-8 ">
                  Tên người người nhận: {name}
                </div>
                <div className="flex  text-xl  text-black font-bold mb-2 mt-4 px-8 ">
                  STK người nhận: {accNum}
                </div>
                <div className="flex  text-xl  text-black font-bold mb-2 mt-4 px-8 ">
                  Số tiền: {formatMoney(money)} VND
                </div>
                <div className="flex  text-xl  text-black font-bold mb-2 mt-4 px-8 ">
                  Nội dung: {description}
                </div>
                <div className="flex justify-end pb-4 px-8">
                  <button
                    onClick={resetState}
                    id="handlecancel"
                    className="cursor-pointer px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded hover:bg-main-green bg-new-green"
                  >
                    Thực hiện giao dịch mới
                  </button>
                  <button
                    id="handleSave"
                    onClick={handleSave}
                    className=" cursor-pointer rounded px-2 py-2 ml-4 text-white text-xs font-bold bg-darkblue hover:bg-[#cf4a04] disabled:bg-[#edb395] "
                  >
                    Lưu người nhận này vào danh sách
                  </button>
                </div>
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
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={4} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <label
                htmlFor="accounts"
                className="text-sm text-gray-900 font-bold flex flex-col mb-4 px-8"
              >
                Chọn tài khoản thanh toán nguồn
              </label>
              <div className="flex flex-col mb-4 px-8">
                <select
                  value={rootNum}
                  onChange={handleChange}
                  id="accounts"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {listAccounts !== null
                    ? listAccounts.map((account, index) => (
                        <option key={index} value={account.accountNumber}>
                          {account.accountNumber}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <label className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8">
                Chọn ngân hàng
              </label>
              <div className="flex flex-col mb-4 px-8">
                {listBank !== undefined ? (
                  <div className=" select-container">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={value}
                      onChange={handleChangeSelect}
                    >
                      {listBank.map((option, index) => (
                        <option key={index} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div>
              <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                Số tài khoản người nhận
              </div>
              <div className="flex flex-col mb-4 px-8">
                <input
                  className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                  id="accNum"
                  type="tel"
                  required
                  value={accNum}
                  onChange={(event) => setAccNum(event.target.value)}
                  placeholder="Nhập số tài khoản"
                />
              </div>
              <div className="flex  text-xs  text-red font-bold mb-2 mt-4 px-8 ">
                {notification}
              </div>
              <div className=" text-xs  text-black inline font-bold mb-2 mt-4 px-8 ">
                Tên người sở hữu tài khoản
              </div>
              <div
                type="button"
                onClick={() => {
                  setShowAddModal(true);
                }}
                className=" text-xs  text-main-green inline font-bold mb-2 mt-4 px-8 hover:cursor-pointer hover:underline"
              >
                Chọn trong danh sách có sẵn
              </div>
              <div className="flex flex-col mb-4 px-8">
                {!name ? (
                  <div className=" appearance-none p-5 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"></div>
                ) : (
                  <div className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline">
                    {name}
                  </div>
                )}
              </div>
              <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                Mời nhập số tiền cần chuyển
              </div>
              <div className="flex flex-col mb-4 px-8">
                <CurrencyInput
                  className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                  id="input-example"
                  name="input-name"
                  placeholder="Nhập số tiền cần chuyển"
                  //  defaultValue={1000}
                  decimalsLimit={2}
                  suffix=" VND"
                  value={money}
                  //onChange={event => setMoney(event.target, value)}
                  onValueChange={(money) => setMoney(money)}
                />
              </div>
              <div className="flex flex-col mb-4 px-8">
                <div>
                  <input
                    type="radio"
                    value="DES"
                    checked={fee === "DES"}
                    onChange={handleChangeFee}
                  />{" "}
                  Người chuyển khoản chịu phí
                </div>
                <div>
                  <input
                    type="radio"
                    value="SRC"
                    checked={fee === "SRC"}
                    onChange={handleChangeFee}
                  />{" "}
                  Người nhận chịu phí
                </div>
              </div>

              <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                Nội dung chuyển khoản
              </div>
              <div className="flex flex-col mb-4 px-8">
                <input
                  className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Nhập nội dung"
                />
              </div>
              <button
                id="handleTransfer"
                onClick={handleTransfer}
                disabled={isDisable}
                className="cursor-pointer rounded px-20 py-2 ml-4 text-white  text-xs font-bold hover:bg-[#cf4a04] bg-[#EA580C] disabled:bg-[#edb395] "
              >
                Chuyển khoản
              </button>
            </div>
          </div>
          {showAddModal && (
            <ListRecipentsExternal
              onClose={handleOnCloseAdd}
              visible={showAddModal}
              handleAccNum={setAccNum}
              handleBank={setValue}
            />
          )}
          {showOTPModal && (
            <ConfirmOTP
              onClose={handleOnCloseOTP}
              visible={showOTPModal}
              transactionId={transactionId}
              handleSuccess={setIsSuccess}
              infoSuccess={setInfoSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Other;
