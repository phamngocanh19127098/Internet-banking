import axios from "axios";

export const fetcherAccounts = async (id) => {
    const url = `http://localhost:3001/accounts/list/${id}`
    const { data, status } = await axios({
        method: 'get',
        url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
    });
    return { data, status }
}

export const fetcherReceiver = async (id) => {
    const url = `http://localhost:3001/accounts/detail/${id}`

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

export const fetcherAddReceiver = async (accNum, nickName) => {
    const url = `http://localhost:3001/savedBeneficiarys`
    try {
        const { data, status } = await axios({
            method: 'post',
            url, data: {
                "beneficiaryAccountNumber": accNum, "beneficiaryNickname": nickName
            }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}



export const fetcherDeleteReceiver = async (id) => {
    const url = `http://localhost:3001/savedBeneficiarys/${id}`
    try {
        const { data, status } = await axios({
            method: 'delete',
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


export const fetcherEditReceiver = async (id, nickname, name, accNum) => {
    const url = `http://localhost:3001/savedBeneficiarys/${id}`
    try {
        const { data, status } = await axios({
            method: 'patch',
            url, data: {
                "beneficiaryAccountNumber": accNum,
                "beneficiaryDefaultName": name,
                "beneficiaryNickname": nickname
            }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherListReceivers = async (userId) => {
    const url = `http://localhost:3001/savedBeneficiarys/list/${userId}`
    try {
        const { data, statusCode } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherSendTransfer = async (accountDesNumber, amount, description, fee) => {
    const url = `http://localhost:3001/transactions/transfer`
    try {
        const { data, statusCode } = await axios({
            method: 'post',
            url, data: {
                "accountDesNumber": accountDesNumber, "amount": amount, "description": description, "payTransactionFee": fee
            }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherVerifyTransfer = async (transactionId, otpCode) => {
    const url = `http://localhost:3001/transactions/internal/transfer/verify`
    try {
        const { data, statusCode } = await axios({
            method: 'post',
            url, data: {
                "transactionId": transactionId, "otpCode": otpCode
            }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherListTransactions = async (accountNumber) => {
    const url = `http://localhost:3001/transactions/list/${accountNumber}`
    try {
        const { data, statusCode } = await axios({
            method: 'get',
            url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}