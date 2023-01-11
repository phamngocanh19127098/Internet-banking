import React, { useState, useEffect } from "react";
import EmployeeNavigation from "../../components/employeeNavigation";
import CurrencyInput from "react-currency-input-field";
import { fetcherPutMoney } from "../../fetchers/fetcherEmployee";
import { fetcherReceiver } from "../../fetchers/fetcherCustomer";
import { fetcherUsername } from "../../fetchers/fetcherEmployee";
const PutMoney = () => {
  const [info, setInfo] = useState("username");
  const [notification, setNotification] = useState("");
  const [result, setResult] = useState();
  const [statuscode, setStatuscode] = useState(404);
  const [check, setCheck] = useState("");
  const [name, setName] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [response, setResponse] = useState();
  const [money, setMoney] = useState();
  const [checkInfo, setCheckInfo] = useState(true);
  async function putMoney(infoMoney) {
    const list = await fetcherPutMoney(infoMoney);
    setResult(list);
  }
  async function getNameByNum() {
    const info = await fetcherReceiver(check);
    setStatuscode(info.status);
    setResponse(info);
    setCheckInfo(!checkInfo);
  }
  async function getNameByUsername() {
    const info = await fetcherUsername(check);
    setStatuscode(info.status);
    setResponse(info);
    setCheckInfo(!checkInfo);
  }

  const options = [
    {
      label: "Tên đăng nhập",
      value: "username",
    },
    {
      label: "Số tài khoản",
      value: "accountNumber",
    },
  ];
  const handleChange = (e) => {
    setInfo(e.target.value);
  };

  useEffect(() => {
    console.log(response);
    if (statuscode === 200) {
      if (check !== null) {
        setName(response.data.data.user.name);
        setNotification(response.data.data.user.name);
      } else {
        setNotification("");
        setName(" ");
      }
    } else {
      if (check !== null && check !== "" && check !== undefined) {
        console.log(typeof check);
        setNotification("Thông tin tài khoản chưa chính xác");
        setName("");
      } else {
        setNotification("");
        setName("");
      }
    }
  }, [statuscode, checkInfo]);

  useEffect(() => {
    console.log(money);
    if (money !== undefined && money !== "" && name !== null && name !== "") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [money, name]);

  useEffect(() => {
    if (check !== null && check !== "" && check !== undefined) {
      if (info === "username") {
        getNameByUsername();
      } else {
        getNameByNum();
      }
    } else {
      setStatuscode(101);
    }
  }, [check, info]);

  useEffect(() => {
    if (result) {
      console.log(result);
      if (result.status === 200) {
        console.log("Success");
      } else {
        console.log("FAIL");
      }
    }
  }, [result]);

  const submitForm = () => {
    const data = { [info]: check, depositMoney: parseInt(money) };
    putMoney(data);
  };
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <EmployeeNavigation id={2} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <div className="select-container flex  text-xs  text-black font-bold mb-2 mt-4 px-8">
                <select value={info} onChange={handleChange}>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-4 px-8">
                <input
                  className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  required
                  value={check}
                  onChange={(event) => setCheck(event.target.value)}
                  //  value={accNum}
                  placeholder="Nhập thông tin tài khoản"
                />
              </div>
              <div className="flex  text-xs  text-red font-bold mb-2 mt-4 px-8 ">
                {notification}
              </div>
              <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                Mời nhập số tiền cần chuyển
              </div>
              <div className="flex flex-col mb-4 px-8">
                <CurrencyInput
                  className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                  id="input-example"
                  name="input-name"
                  placeholder="Nhập số tiền cần chuyển"
                  //  defaultValue={1000}
                  decimalsLimit={2}
                  suffix=" VND"
                  value={money}
                  //onChange={event => setMoney(event.target, value)}
                  onValueChange={(money) => setMoney(money)}
                  required
                />
              </div>
              <button
                disabled={isDisable}
                onClick={submitForm}
                className=" button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#076F32] hover:to-[#076F32] disabled:opacity-25 cursor-pointer rounded-lg"
              >
                Nạp tiền
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutMoney;
