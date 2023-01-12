import moment from "moment/moment";
import "moment/locale/vi";

const ReceivedListTransaction = (props) => {
  moment.locale("vi");
  return (
    <div>
      {props.allList !== null && props.allList !== undefined ? (
        <div className="flex flex-col bg-white ">
          <div className="h-128 relative overflow-x-auto shadow-md sm:rounded-lg flex-grow overflow-auto ">
            <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
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
                      <div className="text-green">Nhận tiền từ</div>
                    </th>
                    <td className="px-6 py-4">
                      <div>{transaction.accountSrcNumber}</div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="text-green text-base font-bold">
                        +{transaction.amount}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      {moment(transaction.updatedAt)
                        .add(7, "h")
                        .format("HH:mm:ss L")}
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

export default ReceivedListTransaction;
