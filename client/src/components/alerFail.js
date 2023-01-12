import React from "react";
const AlertModal = (props) => {

    const handleXClick = (e) => {
        props.onClose();
    };
    if (!props.visible) return null;
    return (
        <div className="fixed inset-0 z-auto bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="border-t-8 border-t-black relative flex-col justify-center bg-white rounded-xl w-2/5">
                <button
                    id="handleX"
                    onClick={handleXClick}
                    className="-right-6 -top-6 absolute flex justify-end rounded-full px-4 py-4 ml-4 text-white font-bold bg-black cursor-pointer"
                >
                    <svg
                        className="pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="10 10 50 50"
                        overflow="visible"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                    >
                        <line x2="70" y2="70" />
                        <line x1="70" y2="70" />
                    </svg>
                </button>
                <div className="flex  text-lg  text-black font-bold pt-4 px-8 border-b-2 border-b-gray-100">
                    Thông báo
                </div>
                <div className="flex  text-sm  text-black mb-2 mt-4 px-8 ">
                    {props.message}
                </div>
            </div>
        </div>
    );
};
export default AlertModal;
