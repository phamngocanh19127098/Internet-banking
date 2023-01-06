import axios from "axios";

export const fetcherAddAccount = async (addData) => {
    const url = `http://localhost:3001/auth/signup`
    try {
        const { data } = await axios({
            method: 'post',
            url, data: addData, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        const { status } = { "status": data.statusCode }
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherPutMoney = async (putMoney) => {
    const url = `http://localhost:3001/accounts/deposit`
    try {
        const { data } = await axios({
            method: 'put',
            url, data: putMoney, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        const { status } = { "status": data.statusCode }
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}

export const fetcherUsername = async (username) => {
    const url = `http://localhost:3001/users/get-customer/${username}`

    try {
        const { data, status } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherAllList = async (accountNumber) => {
    const url = `http://localhost:3001/transactions/list/${accountNumber}`

    try {
        const { data, status } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}



export const fetcherReceivedList = async (accountNumber) => {
    const url = `http://localhost:3001/transactions/list/received/${accountNumber}`

    try {
        const { data, status } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}



export const fetcherTransferList = async (accountNumber) => {
    const url = `http://localhost:3001/transactions/list/transfer/${accountNumber}`

    try {
        const { data, status } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}



export const fetcherDebtList = async (accountNumber) => {
    const url = `http://localhost:3001/transactions/list/debtReminder/${accountNumber}`
    try {
        const { data, status } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}