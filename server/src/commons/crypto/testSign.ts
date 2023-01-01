import RSAKey from "./rsa-key/getRSAKey";
import {Logger} from "@nestjs/common";
import verifySignature from "./verify/VerifySignature";
import {CryptoType} from "../../api/affiliatedBanks/entities/affiliatedBank.entity";


const crypto = require('crypto')

export default function testSignature (obj: any) {
  let data = JSON.stringify(obj)
  let signer = crypto.createSign("RSA-SHA256")
  signer.update(data);
  let sign = signer.sign(RSAKey.privateKey, "hex");
  Logger.log(sign);//from  w ww . j  a  va  2  s.  c  om

  verifySignature(sign,RSAKey.publicKey,CryptoType.RSA, obj)
  return sign
}