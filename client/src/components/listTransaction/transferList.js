import moment from "moment/moment";
const TransferListTransaction = (props) => {

    return (
        <div>
            {props.allList !== null && props.allList !== undefined ? (
                <div class="flex flex-col bg-white">
                    <div class="h-128 relative overflow-x-auto shadow-md sm:rounded-lg flex-grow overflow-auto  ">
                        <table class=" table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 border ">
                            <thead class="relative w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                <tr className="">
                                    <th scope="col" class="sticky px-6 py-3">
                                        Tiêu đề
                                    </th>
                                    <th scope="col" class="sticky px-6 py-3">
                                        Số tài khoản
                                    </th>
                                    <th scope="col" class="sticky px-8 py-3">
                                        Số tiền
                                    </th>
                                    <th scope="col" class="sticky px-8 py-3">
                                        Thời gian
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-x divide-y  w-full " >
                                {props.allList.map((transaction, index) => (
                                    <tr key={index} class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="text-red"> Chuyển tiền từ</div>
                                        </th>
                                        <td class="px-6 py-4">
                                            <div> {transaction.accountDesNumber}</div>

                                        </td>
                                        <td class="px-8 py-4">
                                            <div className="text-red text-base font-bold"> -{transaction.amount}</div>

                                        </td>
                                        <td class="px-8 py-4">
                                            {moment(transaction.updatedAt).format('hh:mm:ss DD MMM, YYYY')}
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
}

export default TransferListTransaction