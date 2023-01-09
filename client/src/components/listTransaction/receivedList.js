import moment from "moment/moment";
const AllListTransaction = (props) => {
    return (
        <div>
            {props.allList !== null && props.allList !== undefined ? (
                <div class="flex flex-col h-64 xl:h-150 lg:h-150 md:h-128 w-48 lg:w-150 xl:w-150 md:w-96 bg-white ">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex-grow overflow-auto ">
                        <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead class="relative w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                <tr className="">
                                    <th scope="col" class="sticky px-6 py-3">
                                        Tiêu đề
                                    </th>
                                    <th scope="col" class="sticky px-6 py-3">
                                        Số tài khoản
                                    </th>
                                    <th scope="col" class="sticky px-6 py-3">
                                        Tên
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
                                            <div className="text-green">Nhận tiền từ</div>
                                        </th>
                                        <td class="px-6 py-4">
                                            <div>{transaction.accountSrcNumber}</div>
                                        </td>
                                        <td class="px-6 py-4">
                                            $2999
                                        </td>
                                        <td class="px-8 py-4">
                                            transaction.accountDesNumber === props.accNum && <div className="text-green text-base font-bold">+{transaction.amount}</div>
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

export default AllListTransaction