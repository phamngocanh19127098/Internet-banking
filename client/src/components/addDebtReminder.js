import React, {useState} from "react";
import {
    createDebtReminderSocket,
    findAllCreatedDebtReminder,
} from "../constants/debtReminderConstants";
import io from "socket.io-client";
import {useSelector} from "react-redux";
const socket = io.connect("http://localhost:3001");

const AddDebtReminder = () => {
    const [accountDesNumber, setAccountDesNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const { userInfo } = useSelector((state) => state.auth)
    const createDebtReminderHandler = (e) => {
        e.preventDefault()

        socket.emit(createDebtReminderSocket, {
            accountDesNumber : accountDesNumber,
            amount,
            userId : userInfo.id,
            description: description
        }
        )
        setTimeout(() => {
            socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
        }, 2000);
        socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})
        socket.emit(findAllCreatedDebtReminder, {userId : userInfo.id})

    }
    return (
        <div>
            <form action="" onSubmit={createDebtReminderHandler}>
                <div>
                    <label htmlFor="">so tai khoan</label>
                    <input value={accountDesNumber} onChange={(e) => {setAccountDesNumber(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="">so tien</label>
                    <input value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="">Nhập lời nhắn</label>
                    <input value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <button type="submit" className="rounded-sm ring-2 ring-grey">
                    tao nhac no
                </button>
            </form>
        </div>
    )
}

export default AddDebtReminder;