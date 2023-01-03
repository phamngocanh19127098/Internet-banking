import {useDispatch, useSelector} from "react-redux";
import {removeDebtReminder} from "../features/debtReminder/debtReminderSlice";
import io from "socket.io-client";
import {removeCreatedDebtReminder, removeReceivedDebtReminder} from "../constants/debtReminderConstants";
import {CREATED_DEBT, RECEIVED_DEBT} from "../constants/buttonType";
const socket = io.connect("http://localhost:3001");

const DebtReminderItem = (props) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth)
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
            <button>Pay debt</button>
        </div>
        <div>


        </div>
    </article>
}

export default DebtReminderItem;