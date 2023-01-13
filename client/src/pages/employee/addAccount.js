import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EmployeeNavigation from "../../components/employeeNavigation";
import { fetcherAddAccount } from "../../fetchers/fetcherEmployee";
import SuccessModal from "../../components/successModal";
import { data } from "browserslist";
import Toast from "../../components/toast";
import Loader from "../../components/loading";
const AddAccount = () => {
  const { register, handleSubmit } = useForm();
  const [list, setList] = useState([]);
  const [message, setMessage] = useState();
  let toastProperties = null;
  const [isLoading, setIsLoading] = useState(false);
  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Success",
          description: "This is a success toast component",
          backgroundColor: "new-green",
        };
        break;
      case "danger":
        toastProperties = {
          id: list.length + 1,
          title: "Thông báo",
          description: message,
          backgroundColor: "red",
        };
        break;
      case "info":
        toastProperties = {
          id: list.length + 1,
          title: "Info",
          description: "This is a info toast component",
          backgroundColor: "#5bc0de",
        };
        break;
      case "warning":
        toastProperties = {
          id: list.length + 1,
          title: "Warning",
          description: "This is a warning toast component",
          backgroundColor: "#f0ad4e",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  const [result, setResult] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleOnCloseSuccess = () => setShowSuccessModal(false);

  async function addAccount(addData) {
    const list = await fetcherAddAccount(addData);
    setResult(list);
  }
  useEffect(() => {
    if (result) {
      console.log(result);
      if (result.status === 200) {
        setIsLoading(false)
        setShowSuccessModal(true);
      } else {
        console.log("FAIL");
        console.log(result.data);
        setIsLoading(false)
        setMessage(result.data.error.message);
        showToast("danger");
      }
    }
  }, [result]);

  const submitForm = (data) => {
    let addData = data;
    addData.role = "customer";
    addAccount(addData);
    setIsLoading(true)
  };
  if (isLoading)
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <EmployeeNavigation id={1} />
            <div className="h-screen flex-auto">
              <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <EmployeeNavigation id={1} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                  Tên đăng nhập
                </div>
                <div className="flex flex-col mb-4 px-8">
                  <input
                    className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    required
                    {...register("username")}
                    //  value={accNum}
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                  Email
                </div>
                <div className="flex flex-col mb-4 px-8">
                  <input
                    className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    required
                    {...register("email")}
                    //  value={accNum}
                    placeholder="Nhập email"
                  />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                  Họ và tên
                </div>
                <div className="flex flex-col mb-4 px-8">
                  <input
                    className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    required
                    {...register("name")}
                    //  value={accNum}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                  Số điện thoại
                </div>
                <div className="flex flex-col mb-4 px-8">
                  <input
                    className=" appearance-none p-3 shadow rounded bg-white text-sm font-medium  text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    required
                    {...register("phone")}
                    //  value={accNum}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <button
                  type="submit"
                  className=" button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#076F32] hover:to-[#076F32] cursor-pointer rounded-lg"
                >
                  Thêm mới
                </button>
              </form>
            </div>
            {showSuccessModal && (
              <SuccessModal
                onClose={handleOnCloseSuccess}
                visible={showSuccessModal}
                name={data.name}
                username={data.username}
              />
            )}
          </div>
        </div>
      </div>
      <Toast toastlist={list} setList={setList} />
    </div>
  );
};

export default AddAccount;
