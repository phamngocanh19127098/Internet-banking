import React from "react";
import { fetcherDeleteManagement } from "../../fetchers/fetcherAdmin";
const DeleteUser = (props) => {

    async function deleteAccount() {
        const list = await fetcherDeleteManagement(props.id);
    }

    const handleRemoveClick = (e) => {
        deleteAccount()
        setTimeout(() => {
            props.handleChange()
            props.onClose()
        }, 500);
    }
    const handleCancelClick = (e) => {
        props.onClose()
    }
    const handleXClick = (e) => {
        props.onClose()
    }

    if (!props.visible) return null
    return (
        <div className="fixed inset-0 z-auto bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5">
                <button id="handleX" onClick={handleXClick} className="-right-6 -top-6 absolute flex justify-end rounded-full px-4 py-4 ml-4 text-white font-bold bg-black" >
                    <svg className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="10 10 50 50" overflow="visible" stroke="white" strokeWidth="5" strokeLinecap="round">
                        <line x2="70" y2="70" />
                        <line x1="70" y2="70" />
                    </svg>
                </button>
                <div className="flex  text-lg  text-black font-bold pt-4 px-8 border-b-2 border-b-gray-100" >Xóa tài khoản</div>
                <div className="flex  text-sm  text-black mb-2 mt-4 px-8 " >Hành động này sẽ xóa nhân viên ra khỏi TaiXiu Bank, bạn có xác nhận xóa?</div>
                <div className="flex justify-end pb-4 px-8">
                    <button id="handlecancel" onClick={handleCancelClick} className="rounded px-2 py-1 ml-4 text-black text-xs font-bold border-[#001B3A] border-[2px] rounded bg-[#FFFFFF] hover:bg-[#F3F4F6] bg-white">Hủy bỏ</button>
                    <button id="handleRemove" onClick={handleRemoveClick} className=" rounded px-2 py-2 ml-4 text-white  text-xs font-bold bg-[#EA580C] hover:bg-[#cf4a04] disabled:bg-[#edb395] ">Xác nhận</button>
                </div>
            </div>
        </div>
    );
}
export default DeleteUser;
