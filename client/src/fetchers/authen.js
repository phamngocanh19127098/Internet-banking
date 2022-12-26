import axios from "axios";

export const fetcherForgetPwd = async (username) => {
    const data = { "username": username }
    const response = await axios
        .post(`http://localhost:3001/auth/forgotpassword`, data)
        .catch((error) => console.log('Error: ', error));
    return response
}

export const fetcherVerifyOTP = async (username, OTP) => {
    const data = { "username": username, "otpCode": OTP }
    const response = await axios
        .post(`http://localhost:3001/auth/forgotpassword`, data)
        .catch((error) => console.log('Error: ', error));
    return response
}


export const fetcherchangePwd = async (username, password, newPassword) => {
    const data = { "username": username, "password": password, "newPassword": newPassword }
    const response = await axios
        .post(`http://localhost:3001/auth/changepassword`, data)
        .catch((error) => console.log('Error: ', error));
    return response
}