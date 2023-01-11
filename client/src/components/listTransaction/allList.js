import moment from "moment/moment";
const AllListTransaction = (props) => {
  return (
    <div>
      {props.allList !== null && props.allList !== undefined ? (
        <div className="flex flex-col  bg-white ">
          <div className="h-128 relative overflow-x-auto shadow-md sm:rounded-lg flex-grow overflow-auto ">
            <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="relative w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr className="">
                  <th scope="col" className="sticky px-6 py-3">
                    Tiêu đề
                  </th>
                  <th scope="col" className="sticky px-6 py-3">
                    Số tài khoản
                  </th>
                  <th scope="col" className="sticky px-8 py-3">
                    Số tiền
                  </th>
                  <th scope="col" className="sticky px-8 py-3">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody className="divide-x divide-y  w-full ">
                {props.allList.map((transaction, index) => (
                  <tr
                    key={index}
                    className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {transaction.transactionType === "TRANSFER" &&
                        transaction.accountSrcNumber === props.accNum && (
                          <div className="text-red"> Chuyển tiền từ</div>
                        )}
                      {transaction.transactionType ===
                        "DEBT_REMINDERS_PAYMENT" &&
                        transaction.accountSrcNumber === props.accNum && (
                          <div className="text-red"> Trả nợ </div>
                        )}
                      {transaction.accountDesNumber === props.accNum && (
                        <div className="text-green">Nhận tiền từ</div>
                      )}
                    </th>
                    <td className="px-6 py-4">
                      {transaction.accountSrcNumber === props.accNum && (
                        <div> {transaction.accountDesNumber}</div>
                      )}
                      {transaction.accountDesNumber === props.accNum && (
                        <div>{transaction.accountSrcNumber}</div>
                      )}
                    </td>
                    <td className="px-8 py-4">
                      {transaction.accountSrcNumber === props.accNum && (
                        <div className="text-red text-base font-bold">
                          {" "}
                          -{transaction.amount}
                        </div>
                      )}
                      {transaction.accountDesNumber === props.accNum && (
                        <div className="text-green text-base font-bold">
                          +{transaction.amount}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-4">
                      {moment(transaction.updatedAt).format(
                        "hh:mm:ss DD MMM, YYYY"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AllListTransaction;
