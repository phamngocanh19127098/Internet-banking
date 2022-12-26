import axios from "axios";

export const fetcherAccessToken = async () => {
    const url = `http://localhost:3001/auth/refresh`
    const { data, status } = await axios({
        method: 'post',
        url,
        data: {
            "refreshToken": localStorage.getItem('refreshToken')
        }
    });
    return { data, status }
}

