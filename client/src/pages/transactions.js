import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import HomeNavigation from '../components/homeNavigation';
import { useState } from 'react';
import Loader from '../components/loading';
import { fetcherListTransactions } from '../fetchers/fetcherCustomer';
import { fetcherAccounts } from '../fetchers/fetcherCustomer';
const Transaction = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [listTransactions, setListTransactions] = useState([])
    const [listAccounts, setListAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [checkTrans, setCheckTrans] = useState()
    const [checkAccs, setCheckAccs] = useState()
    async function getListTrans(accNum) {
        const list = await fetcherListTransactions(accNum)
        setListTransactions(list.data.data)
        setCheckTrans(list.statusCode)
    }
    async function getListAcc() {
        const list = await fetcherAccounts(userInfo.id)
        setListAccounts(list.data.data.accounts)
        setCheckAccs(list.status)
    }


    useEffect(() => {
        if (checkAccs === 200) {
            getListTrans(listAccounts[0].accountNumber)
        }
        console.log(checkAccs)
        console.log(listAccounts)
    }, [checkAccs]);


    useEffect(() => {
        console.log(listTransactions)
    }, [checkTrans]);


    useEffect(() => {
        getListAcc()

    }, []);
    useEffect(() => {
        console.log(listTransactions)
    }, [listTransactions]);
    return (
        <div>
            <div>
                <div className=' bg-cover w-screen flex h-screen bg-[#F0F2FF] '>
                    <HomeNavigation id={7} />
                    <div className="h-screen flex-auto">
                        <div
                            className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey  h-[90%] p-5  pt-8 relative duration-300"
                        >
                            <h1>Transaction</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}


export default Transaction;