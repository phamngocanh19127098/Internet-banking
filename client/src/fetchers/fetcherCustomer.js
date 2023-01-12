import axios from "axios";

export const fetcherAccounts = async (id) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/accounts/list/${id}`;
  const { data, status } = await axios({
    method: "get",
    url,
    headers: { Authorization: "Bearer " + localStorage.getItem("userToken") },
  });
  return { data, status };
};

export const fetcherReceiver = async (id) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/accounts/detail/${id}`;

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

export const fetcherAddReceiver = async (accNum, nickName) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys`;
  try {
    const { data, status } = await axios({
      method: "post",
      url,
      data: {
        beneficiaryAccountNumber: accNum,
        beneficiaryNickname: nickName,
      },
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

export const fetcherDeleteReceiver = async (id) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/${id}`;
  try {
    const { data, status } = await axios({
      method: "delete",
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

export const fetcherEditReceiver = async (id, nickname, name, accNum) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/${id}`;
  try {
    const { data, status } = await axios({
      method: "patch",
      url,
      data: {
        beneficiaryAccountNumber: accNum,
        beneficiaryDefaultName: name,
        beneficiaryNickname: nickname,
      },
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

export const fetcherListReceivers = async (userId) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/list/${userId}`;
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

export const fetcherSendTransfer = async (
  accountDesNumber,
  amount,
  description,
  fee
) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/transfer`;
  try {
    const { data, statusCode } = await axios({
      method: "post",
      url,
      data: {
        accountDesNumber: accountDesNumber,
        amount: amount,
        description: description,
        payTransactionFee: fee,
      },
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

export const fetcherVerifyTransfer = async (transactionId, otpCode) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/transfer/verify`;
  try {
    const { data, statusCode } = await axios({
      method: "post",
      url,
      data: {
        transactionId: transactionId,
        otpCode: otpCode,
      },
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

export const fetcherListTransactions = async (accountNumber) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/list/${accountNumber}`;
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

export const fetcherListBanks = async () => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/affiliatedBanks`;
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

export const fetcherGetInfo = async (accountNumber, bankDesId) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/accounts/get-info`;

  try {
    const { data, status } = await axios({
      method: "post",
      url,
      data: { accountNumber: accountNumber, bankDesId: bankDesId },
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

export const fetcherAddAffiliatedBank = async (
  accNum,
  name,
  nickName,
  bankId
) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/affiliatedBank`;
  try {
    const { data, status } = await axios({
      method: "post",
      url,
      data: {
        beneficiaryAccountNumber: accNum,
        beneficiaryDefaultName: name,
        beneficiaryNickname: nickName,
        beneficiaryBankId: bankId,
      },
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

export const fetcherListReceiversInternal = async (userId) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/list/internal/${userId}`;
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

export const fetcherListReceiversExternal = async (userId) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/savedBeneficiarys/list/external/${userId}`;
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

export const fetcherSendTransferExternal = async (
  accountDesNumber,
  amount,
  description,
  fee,
  bankId
) => {
  const url = `http://ec2-35-171-9-165.compute-1.amazonaws.com:3001/transactions/transfer`;
  try {
    const { data, statusCode } = await axios({
      method: "post",
      url,
      data: {
        accountDesNumber: accountDesNumber,
        amount: amount,
        description: description,
        payTransactionFee: fee,
        bankDesId: bankId,
      },
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
