import moment from "moment/moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils";

const TransferListTransaction = (props) => {
  const [finalList, setFinalList] = useState();

  useEffect(() => {
    if (props.allList !== null && props.allList !== undefined) {
      console.log(props.banks);
      const list = props.allList;
      list.map((element, index) =>
        element["bankDesId"] === null
          ? (element["bankName"] = "TaiXiu Bank")
          : props.banks !== undefined
          ? props.banks.map((bank) =>
              element["bankDesId"] === bank["id"]
                ? (element["bankName"] = bank["name"])
                : null
            )
          : null
      );
      console.log(list);
      setFinalList(list);
    }
  }, [props.allList]);

  moment.locale("vi");
  return (
    <div>
      {finalList !== null && finalList !== undefined ? (
        <div className="flex flex-col bg-white">
          <div className="h-128 w-180 relative overflow-x-auto shadow-md sm:rounded-lg flex-grow overflow-auto  ">
            <table className=" table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 border ">
              <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr className="">
                  <th scope="col" className="sticky px-6 py-3">
                    Tiêu đề
                  </th>
                  <th scope="col" className="sticky px-6 py-3">
                    Số tài khoản
                  </th>
                  <th scope="col" className="sticky px-6 py-3">
                    Ngân hàng
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
                {finalList.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`border-b dark:bg-gray-800 dark:border-gray-700 ${
                      transaction.bankDesId === null
                        ? "bg-[#fffbeb]"
                        : "bg-[#ecfeff]"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-red"> Chuyển tiền đến</div>
                    </th>
                    <td className="px-6 py-4">
                      <div> {transaction.accountDesNumber}</div>
                    </td>
                    <td className="px-6 py-4">{transaction.bankName}</td>
                    <td className="px-8 py-4">
                      <div className="text-red text-base font-bold">
                        -{formatMoney(transaction.amount)}
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

export default TransferListTransaction;
