
import {MessageExpiredTimeException} from "../filters/exceptions/sercurity/MessageExpiredTimeException";
import {InvalidMessageException} from "../filters/exceptions/sercurity/InvalidMessageException";

const md5 = require('md5')
export default function verifyMessage (token: string, data: any, timestamp: number, secretKey: string) {
  const currTime = (new Date()).getTime()
  if (currTime - timestamp > Number(process.env.MESSAGE_EXPIRATION_TIME))
    throw new MessageExpiredTimeException()
  let obj = JSON.stringify(data);
  const verifyToken = md5(timestamp+obj+secretKey)
  if (verifyToken !== token)
    throw new InvalidMessageException()
}