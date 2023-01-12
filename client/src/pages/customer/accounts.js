import React, { useEffect, useState } from "react";
import HomeNavigation from "../../components/homeNavigation";
import { useSelector } from "react-redux";
import { fetcherAccounts } from "../../fetchers/fetcherCustomer";

const Accounts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [listAccounts, setListAccounts] = useState([{}]);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async function getList() {
    const list = await fetcherAccounts(userInfo.id);
    setListAccounts(list.data.data.accounts);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <HomeNavigation id={1} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300">
              {listAccounts !== null ? (
                <div className=" flex  py-2 -my-2 col-start-3 col-span-8 mt-6 place-items-start overflow-y-auto overflow-x-auto row-start-4 row-span-4">
                  <div className="border-b border-gray-200 shadow px-4 py-4  items-center min-w-full justify-center">
                    <table className=" table-fixed border-0 border-b border-gray-300 min-w-full">
                      <thead className=" border-0 border-b border-b-black">
                        <tr>
                          <th className="px-4 py-3 pr-20 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Số tài khoản
                          </th>
                          <th className="px-4 py-3 text-sm font-bold leading-4 tracking-wider text-left text-black ">
                            Số dư
                          </th>
                        </tr>
                      </thead>
                      <tbody className=" ">
                        {listAccounts.map((account, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">
                              <div className="text-sm font-bold text-black-900">
                                {account.accountNumber}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="text-sm text-black-900">
                                {numberWithCommas(account.currentBalance)} VND
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
