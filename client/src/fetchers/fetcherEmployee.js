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
