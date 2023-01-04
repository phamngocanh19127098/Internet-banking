import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeNavigation = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [Menus, setMenus] = useState([
    { id: 0, title: "Trang chủ", link: "/employee", current: false },
    {
      id: 1,
      title: "Thêm người dùng mới",
      link: "/addAccount",
      current: false,
    },
    { id: 2, title: "Nạp tiền", link: "/putMoney", current: false },
  ]);

  useEffect(() => {
    const newChoice = [...Menus];
    newChoice.map((x, idx) =>
      props.id === idx ? (x.current = true) : (x.current = false)
    );
    setMenus(newChoice);
  }, [props]);
  const handlechange = (index) => {
    const newChoice = [...Menus];
    newChoice.map((x, idx) =>
      index === idx ? (x.current = true) : (x.current = false)
    );
    setMenus(newChoice);
  };

  return (
    <div className="m-10 w-72 bg-gradient-to-t from-main-green to-new-green h-[90%] p-5  pt-8 relative duration-300 rounded-xl">
      <div className="flex gap-x-4 items-center">
        <h1 className="text-white origin-left font-medium text-xl duration-200">
          Taixiu Bank
        </h1>
      </div>
      <div className="m-1  h-24 relative flex  items-center rounded-full  text-xl text-white">
        <img src="../avatar.png" className="w-14 rounded-full" alt="avatar" />
        <div className="w-36 inline text-xl text-center m-2 mr-2">
          {" "}
          {userInfo.name}{" "}
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.5 12.6666C28.5 10.1471 27.4991 7.73071 25.7175 5.94911C23.9359 4.16752 21.5196 3.16663 19 3.16663C16.4804 3.16663 14.0641 4.16752 12.2825 5.94911C10.5009 7.73071 9.5 10.1471 9.5 12.6666C9.5 23.75 4.75 26.9166 4.75 26.9166H33.25C33.25 26.9166 28.5 23.75 28.5 12.6666Z"
            stroke="#FFFEFE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.7392 33.25C21.4608 33.7299 21.0612 34.1282 20.5805 34.4051C20.0998 34.682 19.5548 34.8277 19 34.8277C18.4452 34.8277 17.9002 34.682 17.4195 34.4051C16.9387 34.1282 16.5392 33.7299 16.2608 33.25"
            stroke="#FFFEFE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <div className="p-2" key={index}>
            <Link to={Menu.link}>
              <button
                onClick={() => handlechange(index)}
                key={index}
                className={
                  "cursor-pointer w-full px-4 py-2 p-4 tracking-wide" +
                  (Menu.current
                    ? " text-main-green transition-colors duration-200 bg-white rounded-lg"
                    : " rounded-lg text-white transition-colors duration-200  hover:text-main-green hover:bg-white ")
                }
              >
                {Menu.title}
              </button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeNavigation;
