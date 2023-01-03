import {useDispatch, useSelector} from "react-redux";
import {removeDebtReminder} from "../features/debtReminder/debtReminderSlice";
import io from "socket.io-client";
import {payDebt, removeCreatedDebtReminder, removeReceivedDebtReminder} from "../constants/debtReminderConstants";
import {CREATED_DEBT, PAY_DEBT, RECEIVED_DEBT} from "../constants/buttonType";
import {SRC} from "../constants/payTransactionFee";
import {useEffect} from "react";
const socket = io.connect("http://localhost:3001");

const DebtReminderItem = (props) => {
    const token = localStorage.getItem('userToken')
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth)
    const handlePayDebtAction = () => {
        socket.emit(
            payDebt,
            {
                authorization : `Bearer ${token}`,
                toUserId: props.item.userId,
                amount: props.item.amount,
                description: "Thanh toán nợ",
                payTransactionFee : SRC
            }
        )
    }


    return <article className="cart-item">
        <div className="flex items-center justify-between">
            <h4>{props.item.accountSrcNumber}</h4>
            <h4>{props.item.accountDesNumber}</h4>
            <h4 className="amount"> {props.item.amount} </h4>
            <h4>{props.item.paymentStatus}</h4>
            {(props.type === CREATED_DEBT || props.type === RECEIVED_DEBT) && <button className="remove-btn" onClick={() => {
                if (props.type === CREATED_DEBT) {
                    dispatch(removeDebtReminder(props.item.id))
                    socket.emit(removeCreatedDebtReminder, {userId: userInfo.id, id: props.item.id})
                } else if (props.type === RECEIVED_DEBT) {
                    dispatch(removeDebtReminder(props.item.id))
                    socket.emit(removeReceivedDebtReminder, {userId: userInfo.id, id: props.item.id})
                }
            }}>
                remove
            </button>}

            { props.type === PAY_DEBT && <button onClick={handlePayDebtAction}>Pay debt</button>}
        </div>
        <div>


        </div>
    </article>
}

export default DebtReminderItem;