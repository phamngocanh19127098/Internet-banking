import React, { Component, useState } from 'react';

const Home = () => {
    const Menus = [
        { title: "Tổng quan", gap: true },
        { title: "Danh sách tài khoản", gap: true },
        { title: "Thanh toán", gap: true },
        { title: "Các chức năng khác ", gap: true },
        { title: "Liên hệ", gap: true },
    ];
    return (
        <div>
            <div>
                <div className=' bg-cover w-full flex h-screen justify-center items-center bg-[#E5E5E5]' >
                    <div
                        className="m-10 w-72 bg-gradient-to-t from-main-green to-new-green h-[90%] p-5  pt-8 relative duration-300"
                    >

                        <div className="flex gap-x-4 items-center">
                            <h1
                                className="text-white origin-left font-medium text-xl duration-200"
                            >
                                Bank
                            </h1>
                        </div>
                        <div class="m-1 mr-2 h-12 relative flex  items-center rounded-full  text-xl text-white">
                            <img src="../avatar.png" class="w-12 rounded-full" />
                            <div class="w-36 text-sm m-2"> Huynh Hoang Giang </div>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.5 12.6666C28.5 10.1471 27.4991 7.73071 25.7175 5.94911C23.9359 4.16752 21.5196 3.16663 19 3.16663C16.4804 3.16663 14.0641 4.16752 12.2825 5.94911C10.5009 7.73071 9.5 10.1471 9.5 12.6666C9.5 23.75 4.75 26.9166 4.75 26.9166H33.25C33.25 26.9166 28.5 23.75 28.5 12.6666Z" stroke="#FFFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.7392 33.25C21.4608 33.7299 21.0612 34.1282 20.5805 34.4051C20.0998 34.682 19.5548 34.8277 19 34.8277C18.4452 34.8277 17.9002 34.682 17.4195 34.4051C16.9387 34.1282 16.5392 33.7299 16.2608 33.25" stroke="#FFFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                        </div>
                        <ul className="pt-6">
                            {Menus.map((Menu, index) => (
                                <li
                                    key={index}
                                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                        } `}
                                >
                                    <span className={` origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-screen flex-1 ">
                        <div
                            className="m-10 w-72 bg-gray h-[90%] p-5  pt-8 relative duration-300"
                        >
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Home;