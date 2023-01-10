import React from 'react';
import { set, useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import AdminNavigation from '../../components/adminNavigation';
import { fetcherGetManagement, fetcherDeleteManagement, fetcherEditManagement } from '../../fetchers/fetcherAdmin';
import { fetcherListAdmin } from '../../fetchers/fetcherAdmin';
import TableContainer from '../../components/tableConfig/TableContainer';
import { fetcherListBanks } from "../../fetchers/fetcherCustomer";
import { DateRangeColumnFilter, dateBetweenFilterFn } from '../../components/tableConfig/filters';
import moment from "moment/moment";

const ManagementTransaction = () => {
    const [allList, setAllList] = useState([])
    const [finalList, setFinalList] = useState([])
    async function getAllList() {
        const info = await fetcherListAdmin();
        setAllList(info.data.data);
    }

    const [listBank, setListBank] = useState([])
    async function getBanks() {
        const list = await fetcherListBanks();
        setListBank(list.data.data);
    }

    useEffect(() => {
        getAllList();
        getBanks();
    }, []);

    useEffect(() => {
        console.log(allList)
        if (allList !== null) {
            const list = allList
            list.map((element, index) =>
                element["createdAt"] = moment(element["createdAt"]).utcOffset(2, false).format('MM/DD/YYYY hh:mm:ss')
            )
            list.map((element, index) =>
                element["bankDesId"] === null ?
                    element["bankName"] = "TaiXiu Bank"
                    : (listBank.map((bank => (element["bankDesId"] === bank["id"] ? element["bankName"] = bank["name"] : null)))
                    ))
            setFinalList(list)
        }

    }, [allList]);
    const columns = useMemo(
        () => [
            {
                Header: "Tài khoản nguồn",
                accessor: "accountDesNumber",

            },
            {
                Header: "Tài khoản đích",
                accessor: "accountSrcNumber",

            },
            {
                Header: "Ngân hàng",
                accessor: "bankName",

            },
            {
                Header: "Loại thanh toán",
                accessor: "transactionType",
            },
            {
                Header: "Thời gian",
                accessor: "createdAt",
                Filter: DateRangeColumnFilter,
                filter: dateBetweenFilterFn
            }
        ],
        []
    );
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <AdminNavigation id={2} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            {finalList !== null ? (
                                <TableContainer columns={columns} data={finalList} />)
                                : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default ManagementTransaction;