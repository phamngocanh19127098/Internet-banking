import axios from "axios";

export const fetcherForgetPwd = async (username) => {
  const response = await axios
    .post(`http://localhost:3001/auth/forgotpassword`, username)
    .catch((error) => {
      console.log("Error: ", error);
      alert(error.response.data.error.message);
    });
  console.log(response);
  return response;
};


export const fetcherVerifyOTP = async (username, OTP) => {
  const data = { username: username, otpCode: OTP };
  console.log("data", data);
  const response = await axios
    .post(`http://localhost:3001/auth/forgotpassword/verify`, data)
    .catch((error) => {
      console.log("Error: ", error);
      alert(error.response.data.error.message);
    });
  return response;
};

export const fetcherchangePwd = async (username, password, newPassword) => {
  const data = {
    username: username,
    password: password,
    newPassword: newPassword,
  };
  const response = await axios
    .post(`http://localhost:3001/auth/changepassword`, data)
    .catch((error) => console.log("Error: ", error));
  return response;
};
