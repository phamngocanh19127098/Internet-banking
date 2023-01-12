import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminNavigation = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [Menus, setMenus] = useState([
    { id: 0, title: "Trang chủ", link: "/employee", current: false },
    {
      id: 1,
      title: "Quản lý người dùng",
      link: "/management",
      current: false,
    },
    { id: 2, title: "Quản lý đối soát", link: "/manaTrans", current: false },
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

export default AdminNavigation;
