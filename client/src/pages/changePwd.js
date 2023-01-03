import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import { useEffect, useState, useCallback } from "react";
import { fetcherchangePwd } from "../fetchers/authen";
import axios from "axios";

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { register, handleSubmit } = useForm();

  // redirect authenticated user to profile screen

  const submitForm = async (data) => {
    console.log(userInfo.username, data.password, data.newPassword);
    //const response = await fetcherchangePwd(userInfo.username, data.password, data.newPassword)
  };

  return (
    <div>
      <div
        className=" bg-cover w-full flex h-screen justify-center items-center"
        style={{ backgroundImage: `url('../loginbng.png')` }}
      >
        <div className="p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-main-green lg:max-w-xl lg:min-w-[25%] items-center justify-center">
          <h1 className="text-3xl font-semibold text-center text-black uppercase decoration-wavy">
            Đổi mật khẩu
          </h1>
          <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>{" "}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="password"
                {...register("newPassword")}
                required
                className="form__input block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-new-green focus:ring-new-green focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex">
              <Link
                to="/"
                className=" w-full text-center px-4 py-2 mr-12 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
              >
                Trở về
              </Link>
              <button
                type="submit"
                className=" cursor-pointer w-full px-4 py-2 mt-8 tracking-wide text-white transition-colors duration-200 bg-gradient-to-r from-[#076F32] to-[#41b06f] rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
