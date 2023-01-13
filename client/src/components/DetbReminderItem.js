import { useDispatch, useSelector } from "react-redux";
import { removeDebtReminder } from "../features/debtReminder/debtReminderSlice";
import io from "socket.io-client";
import {
  payDebt,
  removeCreatedDebtReminder,
  removeReceivedDebtReminder,
} from "../constants/debtReminderConstants";
import { CREATED_DEBT, PAY_DEBT, RECEIVED_DEBT } from "../constants/buttonType";
import { SRC } from "../constants/payTransactionFee";
import { updateCurrentDebt } from "../features/notification/notificationSlice";
import { socketOption } from "../config/socket-option";
const socket = io.connect(
  "http://ec2-35-171-9-165.compute-1.amazonaws.com:3001",
  socketOption
);

const DebtReminderItem = (props) => {
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handlePayDebtAction = () => {
    // const notification = useSelector((state) => state.notification);
    dispatch(updateCurrentDebt(props.item));
    socket.emit(payDebt, {
      authorization: `Bearer ${token}`,
      toUserId: props.item.userId,
      amount: props.item.amount,
      description: "Thanh toán nợ",
      payTransactionFee: SRC,
    });
  };

  return (
    <article id={props.item.id} className="cart-item">
      <div className=" grid grid-cols-3 bg-[#d9ead3] w-full h-fit border rounded-lg m-3 p-3">
        <div className="col-span-2 flex flex-col items-start ">
          <h4>
            <span className="font-bold">Người gửi: </span>
            {props.item.accountSrcNumber}
          </h4>
          <h4>
            <span className="font-bold">Gửi đến: </span>
            {props.item.accountDesNumber}
          </h4>
          <h4 className="amount">
            <span className="font-bold">Số tiền cần thanh toán: </span>{" "}
            {props.item.amount} đ
          </h4>
          <h4>
            <span className="font-bold">Trạng thái thanh toán: </span>
            {props.item.paymentStatus}
          </h4>
        </div>
        <div className="col-span-1 grid grid-col justify-end">
          {(props.type === CREATED_DEBT || props.type === RECEIVED_DEBT) && (
            <button
              className="cursor-pointer h-fit px-6 py-2 text-sm font-bold text-white bg-red rounded-full hover:bg-[#ea5b5b]"
              onClick={() => {
                if (props.type === CREATED_DEBT) {
                  dispatch(removeDebtReminder(props.item.id));
                  socket.emit(removeCreatedDebtReminder, {
                    userId: userInfo.id,
                    id: props.item.id,
                  });
                } else if (props.type === RECEIVED_DEBT) {
                  dispatch(removeDebtReminder(props.item.id));
                  socket.emit(removeReceivedDebtReminder, {
                    userId: userInfo.id,
                    id: props.item.id,
                  });
                }
              }}
            >
              Xóa
            </button>
          )}

          {(props.type === PAY_DEBT || props.type === RECEIVED_DEBT) && (
            <button
              className="cursor-pointer h-fit w-fit  px-6 py-2 text-sm font-bold text-white bg-brightblue rounded-full hover:bg-hover-brightblue"
              onClick={handlePayDebtAction}
            >
              Thanh toán
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default DebtReminderItem;
