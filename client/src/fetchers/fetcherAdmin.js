import axios from "axios";

export const fetcherGetManagement = async () => {
    const url = `http://localhost:3001/users/employee/list`
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


export const fetcherEditManagement = async (id, info) => {
    const url = `http://localhost:3001/users/employee/${id}`
    try {
        const { data, statusCode } = await axios({
            method: 'put',
            url, data: info, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}


export const fetcherDeleteManagement = async (id) => {
    const url = `http://localhost:3001/users/employee/${id}`
    try {
        const { data, statusCode } = await axios({
            method: 'delete',
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



export const fetcherListAdmin = async () => {
    const url = `http://localhost:3001/transactions/list`

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


export const fetcherListByID = async (id) => {
    const url = `http://localhost:3001/transactions/listWithBankId`

    try {
        const { data, status } = await axios({
            method: 'get',
            url, data: { "bankId": 1001 }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, status }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}
