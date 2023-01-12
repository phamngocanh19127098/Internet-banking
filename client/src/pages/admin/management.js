import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AdminNavigation from "../../components/adminNavigation";
import {
  fetcherGetManagement,
  fetcherDeleteManagement,
  fetcherEditManagement,
} from "../../fetchers/fetcherAdmin";
import EditUser from "../../components/management/editUser";
import DeleteUser from "../../components/management/deleteUser";
import moment from "moment";
import AddUser from "../../components/management/addUser";
import Loader from "../../components/loading";
import "moment/locale/vi";

const Management = () => {
  moment.locale("vi");

  const [listEmployees, setListEmployees] = useState([]);

  const [editData, setEditData] = useState();

  const [deleteData, setDeleteData] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOnCloseAdd = () => setShowAddModal(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const handleOnCloseEdit = () => setShowEditUser(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const handleOnCloseDelete = () => setShowDeleteUser(false);

  async function getList() {
    const list = await fetcherGetManagement();
    setListEmployees(list.data.data);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleChange = () => {
    setIsLoading(true);
    setTimeout(() => {
      getList();
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(listEmployees);
  }, [listEmployees]);
  if (isLoading)
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <AdminNavigation id={1} />
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
        <div className=" bg-cover w-full flex h-screen bg-[#F0F2FF] ">
          <AdminNavigation id={1} />
          <div className="flex-auto">
            <div className="m-10 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              <div className=" row-start-2 row-span-1 flex justify-end place-items-end col-start-7 col-span-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(true);
                  }}
                  className="cursor-pointer px-8 h-10  text-sm font-bold text-white bg-orange rounded hover:bg-[#cf4e0a]"
                >
                  Thêm nhân viên
                </button>
              </div>
              <div className=" h-128 w-150 lg:w-210 xl:w-210 flex  py-2 -my-2 col-start-3 col-span-8 mt-6 place-items-start overflow-y-auto overflow-x-auto row-start-4 row-span-4">
                <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                  <table className=" table-fixed border-0 border-b border-gray-300 min-w-full">
                    <thead className=" border-0 border-b border-b-black">
                      <tr>
                        <th className="px-2 py-3 pr-20 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Tên
                        </th>
                        <th className="px-2 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Dob
                        </th>
                        <th className="px-2 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          SDT
                        </th>
                        <th className="px-2 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Địa chỉ
                        </th>
                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Email
                        </th>
                        <th className="px-3 py-3 text-sm font-bold leading-4 tracking-wider text-left text-gray-500"></th>
                        <th className="px-3 py-3 text-sm font-bold leading-4 tracking-wider text-left text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-300 ">
                      {listEmployees.map((person, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {person.name}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {!person.dob && null}
                              {person.dob && moment(person.dob).format("L")}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {person.phone}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {person.address}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {person.email}
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div>
                              <div>
                                <button
                                  onClick={() => {
                                    setShowDeleteUser(true);
                                    setDeleteData(person.id);
                                  }}
                                  className="px-10 py-2 text-sm font-bold text-white text-center bg-medium-pink-red rounded-full hover:bg-[#870e2b] disabled:bg-[#edb395] "
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div>
                              <button
                                onClick={() => {
                                  setShowEditUser(true);
                                  setEditData(person);
                                }}
                                className="px-12 py-2 text-sm font-bold text-white bg-green rounded-full hover:bg-[#1bc46e]"
                              >
                                Sửa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAddModal && (
          <AddUser
            onClose={handleOnCloseAdd}
            visible={showAddModal}
            handleChange={handleChange}
          />
        )}
        {showEditUser && (
          <EditUser
            onClose={handleOnCloseEdit}
            visible={showEditUser}
            info={editData}
            handleChange={handleChange}
          />
        )}
        {showDeleteUser && (
          <DeleteUser
            onClose={handleOnCloseDelete}
            visible={showDeleteUser}
            id={deleteData}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Management;
