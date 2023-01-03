import React from "react";
import DebtReminderItem from "./DetbReminderItem";


const DebtReminderList = (props) => {

    return (
        <div>
            {props.debtReminders.map((e) => {
                return <DebtReminderItem item = {e} type = {props.type}/>
            })}
        </div>
    )
}

export default DebtReminderList;