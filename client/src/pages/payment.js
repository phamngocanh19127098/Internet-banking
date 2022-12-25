import React from 'react';
import HomeNavigation from '../components/homeNavigation';
const Payment = () => {
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={3} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <h1>Payment</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}


export default Payment;