import React from 'react';
import HomeNavigation from '../components/homeNavigation';
const Loan = () => {
    return (
        <div>
            <div>
                <div className=' bg-cover w-full flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={4} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <h1>Loan</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}


export default Loan;