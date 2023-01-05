import axios from "axios";

export const fetcherManagementAccount = async (data) => {
    const url = `http://localhost:3001/transactions/internal/transfer/verify`
    try {
        const { data, statusCode } = await axios({
            method: 'post',
            url, data: data, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
        });
        return { data, statusCode }
    } catch (err) {
        console.error("Error response:");
        const data = err.response.data
        const status = err.response.status
        return { data, status }
    }
}
