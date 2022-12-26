import axios from "axios";

export const fetcherAccounts = async (id) => {
    const url = `http://localhost:3001/accounts/list/${id}`
    const { data, status } = await axios({
        method: 'get',
        url, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') }
    });
    return { data, status }
}
