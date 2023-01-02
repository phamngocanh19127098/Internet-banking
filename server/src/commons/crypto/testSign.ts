import RSAKey from "./getRSAKey";
import {Logger} from "@nestjs/common";
import verifySignature from "./verify/VerifySignature";
import {CryptoType} from "../../api/affiliatedBanks/entities/affiliatedBank.entity";


const crypto = require('crypto')

export default function testSignature (obj: any) {
  let data = JSON.stringify(obj)
  let signer = crypto.createSign("RSA-SHA256")
  signer.update(data);
  let sign = signer.sign(process.env.RSA_PRIVATE_KEY, "hex");
  Logger.log(sign);

  verifySignature(sign,process.env.RSA_PUBLIC_KEY,CryptoType.RSA, obj)
  return sign
}