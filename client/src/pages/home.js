import React from 'react';
import HomeNavigation from '../components/homeNavigation';
import { useSelector } from 'react-redux'
const Home = () => {
    const { userInfo } = useSelector((state) => state.auth)
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={0} />
                    <div className="h-screen flex-auto">
                        <div
                            className="grid grid-rows-3 grid-cols-3 gap-4 m-10 w-200 bg-[#F0F2FF] rounded-sm  h-[90%] relative duration-300"
                        >
                            <div class="row-span-1 col-span-1 ring-2 ring-grey rounded flex flex-col justify-center items-center ">
                                <div
                                    className="text-center text-main-green font-medium  text-sm duration-200"
                                >
                                    Số dư hiện tại
                                </div>
                                <div
                                    className="text-center text-main-green font-medium text-bold text-2xl duration-200"
                                >
                                    3.000.000 VND
                                </div>
                            </div>
                            <div class=" row-span-1 col-span-1 ring-2 ring-grey rounded">02</div>
                            <div class="row-span-2 col-span-2 ring-2 ring-grey rounded">03</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}


export default Home;