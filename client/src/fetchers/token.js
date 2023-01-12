import axios from "axios";

export const fetcherAccessToken = async () => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/auth/refresh`;
  try {
    const { data, status } = await axios({
      method: "post",
      url,
      data: {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    });
    return { data, status };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};
