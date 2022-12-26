import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import HomeNavigation from '../components/homeNavigation';
import AddRecipent from '../components/addRecipent';
const Recipents = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [showAddModal, setShowAddModal] = useState(false);
    const handleOnCloseAdd = () => setShowAddModal(false)

    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={2} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <h1>Recipents</h1>
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