import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeNavigation from '../components/homeNavigation';
import AddRecipent from '../components/addRecipent';
import { fetcherListReceivers } from '../fetchers/fetcherCustomer';


const Recipents = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [showAddModal, setShowAddModal] = useState(false);
    const handleOnCloseAdd = () => setShowAddModal(false)
    const [listRecipents, setListRecipents] = useState([{}])

    async function getList() {
        const list = await fetcherListReceivers(userInfo.id)
        setListRecipents(list.data.data)
    }
    useEffect(() => {
        console.log(listRecipents)
    }, [listRecipents]);
    useEffect(() => {
        getList()
    }, []);
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={2} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            {listRecipents !== null ?
                                <div className=" flex  py-2 -my-2 col-start-3 col-span-8 mt-6 place-items-start overflow-y-auto overflow-x-auto row-start-4 row-span-4">
                                    <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                                        <table className=" table-fixed border-0 border-b border-gray-300 min-w-full">
                                            <thead className=" border-0 border-b border-b-black">
                                                <tr>
                                                    <th className="px-4 py-3 pr-20 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                                        Tên người nhận
                                                    </th>
                                                    <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                                                        Số tài khoản
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className=" ">

                                                {listRecipents.map((account, index) => (
                                                    <tr key={index}>
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


                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                : null}
                            <div className=" row-start-2 row-span-1 flex justify-end place-items-end col-start-7 col-span-2 ">
                                <button type="button" onClick={() => {
                                    setShowAddModal(true);
                                }} className="px-8 h-10  text-sm font-bold text-white bg-orange rounded hover:bg-[#cf4e0a]">
                                    Thêm người nhận mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showAddModal && <AddRecipent onClose={handleOnCloseAdd} visible={showAddModal} />
                }
            </div>

        </div>

    );
}


export default Recipents;