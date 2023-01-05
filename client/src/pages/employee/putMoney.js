import React from "react";
import { useForm } from "react-hook-form";
import EmployeeNavigation from "../../components/employeeNavigation";
import CurrencyInput from "react-currency-input-field";
const PutMoney = () => {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <EmployeeNavigation id={2} />
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
                    {...register("money")}
                    // value={money}
                    //onChange={event => setMoney(event.target, value)}
                    //   onValueChange={(money) => setMoney(money)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className=" button w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] hover:from-[#076F32] hover:to-[#076F32] cursor-pointer rounded-lg"
                >
                  Nạp tiền
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutMoney;
