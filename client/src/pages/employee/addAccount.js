import React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EmployeeNavigation from '../../components/employeeNavigation';
const AddAccount = () => {
    const { register, handleSubmit } = useForm();

    const submitForm = (data) => {
        console.log(data)
    };
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <EmployeeNavigation id={1} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <form className="mt-6 form" onSubmit={handleSubmit(submitForm)}>
                                <div className="flex  text-xs  text-black font-bold mb-2 mt-4 px-8 ">
                                    Tên đăng nhập
                                </div>
                                <div className="flex flex-col mb-4 px-8">
                                    <input
                                        className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded flex p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer border border-[#001B3A]  leading-tight focus:outline-none focus:shadow-outline"
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
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddAccount;