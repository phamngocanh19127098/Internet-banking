import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "../../components/homeNavigation";
import AddRecipent from "../../components/addRecipent";
import { fetcherListReceivers } from "../../fetchers/fetcherCustomer";
import DeleteRecipent from "../../components/deleteRecipent";
import EditRecipent from "../../components/editRecipent";
import Loader from "../../components/loading";
import { fetcherListBanks } from "../../fetchers/fetcherCustomer";

const Recipents = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOnCloseAdd = () => setShowAddModal(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleOnCloseEdit = () => setShowEditModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleOnCloseDelete = () => setShowDeleteModal(false);
  const [listRecipents, setListRecipents] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [editInfo, setEditInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function getList() {
    const list = await fetcherListReceivers(userInfo.id);
    setListRecipents(list.data.data);
  }
  useEffect(() => {
    console.log(listRecipents);
  }, [listRecipents]);

  const [listBank, setListBank] = useState([]);
  async function getBanks() {
    const list = await fetcherListBanks();
    setListBank(list.data.data);
  }

  useEffect(() => {
    setIsLoading(true);
    getList();
    getBanks();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    console.log("BANK ", listBank);
  }, [listBank]);

  function hanldeChange() {
    setIsLoading(true);
    setTimeout(() => {
      getList();
      setIsLoading(false);
    }, 2000);
  }

  if (isLoading)
    return (
      <div>
        <div>
          <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
            <HomeNavigation id={2} />
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
          <HomeNavigation id={2} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              {listRecipents.length !== 0 ? (
                <div className=" flex  py-2 -my-2 col-start-3 col-span-8 mt-6 place-items-start overflow-y-auto overflow-x-auto row-start-4 row-span-4">
                  <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                    <table className=" table-fixed border-0 min-w-full">
                      <thead className=" border-0 border-b border-b-black">
                        <tr>
                          <th className="px-4 py-3 pr-20 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Tên người nhận
                          </th>
                          <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Số tài khoản
                          </th>
                          <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Ngân hàng
                          </th>
                          <th className="px-8 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Chỉnh sửa thông tin
                          </th>
                          <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black">
                            Xóa người nhận
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listRecipents.map((account, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="px-4 py-2">
                              <div className="text-sm font-bold text-black-900">
                                {account.beneficiaryNickname}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="text-sm text-black-900">
                                {account.beneficiaryAccountNumber}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="text-sm text-black-900">
                                {account.beneficiaryBankId === null &&
                                  "TaiXiu Bank"}
                                {listBank.map(
                                  (bank, index) =>
                                    bank.id === account.beneficiaryBankId &&
                                    bank.name
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-2">
                              <div>
                                <button
                                  onClick={() => {
                                    setShowEditModal(true);
                                    setEditInfo({
                                      ...editInfo,
                                      id: account.id,
                                      name: account.beneficiaryDefaultName,
                                      nickname: account.beneficiaryNickname,
                                      accNum: account.beneficiaryAccountNumber,
                                    });
                                  }}
                                  className="cursor-pointer px-12 py-2 text-sm font-bold text-white bg-green rounded-full hover:bg-[#1bc46e]"
                                >
                                  Chỉnh sửa
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-2">
                              <div>
                                <button
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setIdDelete(account.id);
                                  }}
                                  className="cursor-pointer px-10 py-2 text-sm font-bold text-white text-center bg-medium-pink-red rounded-full hover:bg-[#870e2b] disabled:bg-[#edb395] "
                                >
                                  Xoá
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className=" text-lg font-semibold border-b border-gray-300">
                  Không có người nhận
                </div>
              )}
              <div className=" row-start-2 row-span-1 flex justify-end place-items-end col-start-7 col-span-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(true);
                  }}
                  className="cursor-pointer px-8 h-10  text-sm font-bold text-white bg-orange rounded hover:bg-[#cf4e0a]"
                >
                  Thêm người nhận mới
                </button>
              </div>
            </div>
          </div>
        </div>
        {showAddModal && (
          <AddRecipent
            onClose={handleOnCloseAdd}
            visible={showAddModal}
            handleChange={hanldeChange}
            banks={listBank}
          />
        )}
        {showDeleteModal && (
          <DeleteRecipent
            onClose={handleOnCloseDelete}
            visible={showDeleteModal}
            idDel={idDelete}
            handleChange={hanldeChange}
          />
        )}
        {showEditModal && (
          <EditRecipent
            onClose={handleOnCloseEdit}
            visible={showEditModal}
            editInfo={editInfo}
            handleChange={hanldeChange}
          />
        )}
      </div>
    </div>
  );
};

export default Recipents;
