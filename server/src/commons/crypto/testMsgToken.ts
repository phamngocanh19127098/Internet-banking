import {Logger} from "@nestjs/common";
import verifyMessage from "./verify/VerifyMessage";
const md5 = require('md5')
export default function testMsgToken (obj: any,currTime: number,secretKey:string) {
  let data = JSON.stringify(obj)
  const verifyToken = md5(currTime+data+secretKey)
  Logger.log(verifyToken)
  verifyMessage(verifyToken,obj,currTime,secretKey)
  return verifyToken
}