import axios from "axios";
import {BadRequestException, Logger} from "@nestjs/common";
import {InvalidSignatureException} from "../../commons/filters/exceptions/sercurity/InvalidSignatureException";
const jwt = require('jsonwebtoken')
export const SOLAR_BANK_CODE = 'SLB'
const BANK_CODE = 'TXB'
const BASE_URL = 'https://group08-solarbanking-webnc.onrender.com/api/customers'
class AccountService {
  async getAccountInfo(accountNumber:string) {
    const payload = {
      des_account_number: accountNumber,
      des_bank_code: SOLAR_BANK_CODE
    }

    const token = jwt.sign({payload},process.env.RSA_PRIVATE_KEY,{
      algorithm: 'RS256',
      expiresIn: 100000
    })
    const data = {
      token: token,
      bank_code: BANK_CODE
    }
    Logger.log({...data})
    return axios({
      url:`${BASE_URL}/desaccount`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': "application/json"
      }
    }).then((response) => {
      const data = {
        accountNumber: accountNumber,
        user: {
          id: response.data.infoRecipient.user_id,
          name: response.data.infoRecipient.full_name
        }
      }
      return {
        data,
        statusCode: 200,
        message: 'Lấy thông tin tài khoản thành công.',
      };
    }).catch( (error) => {
      // Logger.log(error.response.data)
      throw new BadRequestException(error.response.data.message)
    });
  }

  async intertransaction(infoTransaction :any,publicKey: any) {

    const token = jwt.sign({infoTransaction},process.env.RSA_PRIVATE_KEY,{
      algorithm: 'RS256',
      expiresIn: 100000
    })
    const data = {
      token: token,
      bank_code: BANK_CODE
    }
    Logger.log({...data})
    const verifyToken = await axios({
      url:`${BASE_URL}/intertransaction`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': "application/json"
      }
    }).then((resp) => {
      if(resp.data.isSuccess) {
        const encryptToken = resp.data.encryptedData.encryptToken
        const verifyToken = jwt.verify(encryptToken,
          publicKey,{
            algorithms:"RS256",
          maxAge:100000
        });
        Logger.log(verifyToken.payload)
        return verifyToken
      }
    }).catch( (error) => {
      // Logger.log(error.response.data)
      throw new BadRequestException(error.response.data.message)
    });
    if(verifyToken.payload.des_account_number !== infoTransaction.des_account_number)
      throw new InvalidSignatureException("Thông tin chuyển khoản liên ngân hàng không được xác thực.")
  }

  createToken(payload:any) {
    return jwt.sign({payload},process.env.RSA_PRIVATE_KEY,{
      algorithm: 'RS256',
      expiresIn: 100000
    })
  }
}
export default new AccountService();