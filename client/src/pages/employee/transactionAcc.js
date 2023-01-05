import React from 'react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EmployeeNavigation from '../../components/employeeNavigation';
const SeeTransactions = () => {
    const [openTab, setOpenTab] = useState(1);
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <EmployeeNavigation id={3} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <div>
                                <div className="container mx-auto ">
                                    <div className="flex flex-col items-center justify-center max-w-xl">
                                        <ul className="flex space-x-2">
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(1)}
                                                    className={` ${openTab === 1 ? "bg-purple-600 text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}
                                                >
                                                    React Tabs 1
                                                </div>
                                            </li>
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(2)}
                                                    className={` ${openTab === 2 ? "bg-purple-600 text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}


                                                >
                                                    React Tabs 2
                                                </div>
                                            </li>
                                            <li>
                                                <div

                                                    onClick={() => setOpenTab(3)}
                                                    className={` ${openTab === 3 ? "bg-purple-600 text-white" : ""} inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}


                                                >
                                                    React Tabs 3
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="p-3 mt-6 bg-white border">
                                            <div className={openTab === 1 ? "block" : "hidden"}>
                                                {" "}
                                                React JS with Tailwind CSS Tab 1 Content show
                                            </div>
                                            <div className={openTab === 2 ? "block" : "hidden"}>
                                                React JS with Tailwind CSS Tab 2 Content show
                                            </div>
                                            <div className={openTab === 3 ? "block" : "hidden"}>
                                                React JS with Tailwind CSS Tab 3 Content show
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SeeTransactions;