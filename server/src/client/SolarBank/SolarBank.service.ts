import axios from "axios";
import {BadRequestException, Logger} from "@nestjs/common";
const jwt = require('jsonwebtoken')
export const SOLAR_BANK_CODE = 'SLB'
const BANK_CODE = 'TXB'
const BASE_URL = 'https://group08-solarbanking-webnc.onrender.com/api/customers'
class AccountService {
  async getAccountInfo(accountNumber:string,privateKey: string) {
    const payload = {
      des_account_number: accountNumber,
      des_bank_code: SOLAR_BANK_CODE
    }
    Logger.log(privateKey)
    const token = jwt.sign(payload,privateKey,{
      algorithm: 'RS256',
      expiresIn: 100000
    })
    const data = {
      token: token,
      bank_code: BANK_CODE
    }

    return axios({
      url:`${BASE_URL}/desaccount`,
      method: 'get',
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

}
export default new AccountService();