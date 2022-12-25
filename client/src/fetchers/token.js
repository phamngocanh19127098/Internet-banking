import axios from "axios";
const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('refreshToken')}`,
    },
};


export const fetcherAccessToken = async () => {
    const token = { "refreshToken": localStorage.getItem('refreshToken') }
    const response = await axios
        .post(`http://localhost:3001/auth/refresh`, token)
        .catch((error) => console.log('Error: ', error));
    return response
}