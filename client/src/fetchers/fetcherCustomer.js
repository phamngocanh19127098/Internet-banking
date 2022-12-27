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