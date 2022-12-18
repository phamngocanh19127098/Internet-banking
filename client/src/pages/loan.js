import React, { useEffect } from 'react';
import HomeNavigation from '../components/homeNavigation';
import io from "socket.io-client";
import { findAllCreatedDebtReminder } from '../constants/debtReminderConstants';
import { useSelector, useDispatch} from "react-redux"
import { onInit } from '../feature/debt-reminder/debtReminderSlice';
const SERVER_POINT = "localhost:3001";
const socket = io(SERVER_POINT);

socket.emit(findAllCreatedDebtReminder, {userId : 1039});
const Loan = () => {
    // const detbReminder = useSelector((state) => state.debtReminder)
    const dispatch = useDispatch();
    
    useEffect(() => {
        socket.on(findAllCreatedDebtReminder, (data) => {
            dispatch(onInit(data))
        });
      },[dispatch]);
    
    
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