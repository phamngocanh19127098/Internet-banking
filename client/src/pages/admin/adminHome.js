import React from "react";
import AdminNavigation from "../../components/adminNavigation";

const Admin = () => {
  return (
    <div>
      <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
        <AdminNavigation id={0} />
        <div className="h-screen flex-auto">
          <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey h-[90%] p-5 pt-8 relative duration-300">
            <h1> Chào bạn, chúc bạn có một ngày làm việc vui vẻ và hiệu quả</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
