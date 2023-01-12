import axios from "axios";

export const fetcherGetManagement = async () => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/users/employee/list`;
  try {
    const { data, statusCode } = await axios({
      method: "get",
      url,
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    return { data, statusCode };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};

export const fetcherEditManagement = async (id, info) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/users/employee/${id}`;
  try {
    const { data, statusCode } = await axios({
      method: "put",
      url,
      data: info,
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    return { data, statusCode };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};

export const fetcherDeleteManagement = async (id) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/users/employee/${id}`;
  try {
    const { data, statusCode } = await axios({
      method: "delete",
      url,
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    return { data, statusCode };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};

export const fetcherListAdmin = async () => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/list`;

  try {
    const { data, status } = await axios({
      method: "get",
      url,
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    return { data, status };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};

export const fetcherListByID = async (id) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/listWithBankId`;

  try {
    const { data, status } = await axios({
      method: "post",
      url,
      data: { bankId: id },
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    return { data, status };
  } catch (err) {
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};

export const fetcherAddAccount = async (addData) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/auth/signup`;
  try {
    const { data } = await axios({
      method: "post",
      url,
      data: addData,
      headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
    });
    const { status } = { status: data.statusCode };
    return { data, status };
  } catch (err) {
    alert(err.response.data.error.message);
    console.error("Error response:");
    const data = err.response.data;
    const status = err.response.status;
    return { data, status };
  }
};
