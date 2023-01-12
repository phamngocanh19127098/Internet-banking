import React from "react";
import { useState, useEffect } from "react";
import EmployeeNavigation from "../../components/employeeNavigation";
import Loader from "../../components/loading";
import { fetcherGetAllCustomer } from "../../fetchers/fetcherEmployee";
import CloseAcc from "../../components/closeAcc";

const LockUserAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleOnCloseDelete = () => setShowDeleteModal(false);
  const [listRecipents, setListRecipents] = useState();
  const [username, setUsername] = useState();
  const [userStatus, setUserStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function getList() {
    const list = await fetcherGetAllCustomer();
    setIsLoading(false);
    setListRecipents(list.data.data);
  }

  useEffect(() => {
    console.log(listRecipents);
  }, [listRecipents]);

  useEffect(() => {
    setIsLoading(true);
    getList();
  }, []);

  function hanldeChange() {
    setIsLoading(true);
    setTimeout(() => {
      getList();
    }, 2000);
  }

  if (isLoading)
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <EmployeeNavigation id={4} />
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
      <div className=" bg-cover w-full flex h-screen bg-[#F0F2FF] ">
        <EmployeeNavigation id={4} />
        <div className="h-screen flex-auto">
          <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
            {listRecipents !== undefined ? (
              <div className="h-128 w-150 lg:w-210 xl:w-210 flex  py-2 -my-2 col-start-3 col-span-8 mt-6 place-items-start overflow-y-auto overflow-x-auto row-start-4 row-span-4">
                <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                  <table className=" table-fixed border-0 min-w-full">
                    <thead className=" border-0 border-b border-b-black">
                      <tr>
                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Tên
                        </th>
                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Username
                        </th>
                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Số tài khoản
                        </th>
                        <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black">
                          Đóng tài khoản
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listRecipents.map((account, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {account.name}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {account.username}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {account.accountNumber}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-black-900">
                              {account.status ? <p>Đã đóng</p> : <p>Mở</p>}
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            {account.status ? (
                              <div>
                                <button
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setUsername(account.username);
                                    setUserStatus(account.status);
                                  }}
                                  className="cursor-pointer px-10 py-2 text-sm font-bold text-white text-center bg-new-green rounded-full hover:bg-main-green disabled:bg-[#edb395]"
                                >
                                  Mở
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setUsername(account.username);
                                    setUserStatus(account.status);
                                  }}
                                  className="cursor-pointer px-10 py-2 text-sm font-bold text-white text-center bg-medium-pink-red rounded-full hover:bg-[#870e2b] disabled:bg-[#edb395]"
                                >
                                  Đóng
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className=" text-lg font-semibold border-b border-gray-300">
                Không có người dùng
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <CloseAcc
          onClose={handleOnCloseDelete}
          visible={showDeleteModal}
          username={username}
          status={userStatus}
          handleChange={hanldeChange}
        />
      )}
    </div>
  );
};

export default LockUserAccount;
