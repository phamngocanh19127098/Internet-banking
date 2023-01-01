import {CryptoType} from "../../../api/affiliatedBanks/entities/affiliatedBank.entity";
import {InvalidSignatureException} from "../../filters/exceptions/sercurity/InvalidSignatureException";
const crypto = require('crypto')

export default function verifySignature (signature: string, publicKey: string, cryptoType: CryptoType, obj: any) {
  let data = JSON.stringify(obj)
  const verify = crypto.createVerify('RSA-SHA256');
  verify.write(data);
  verify.end();
  // const res = verify.verify(publicKey, signature, 'hex');// truyen public key, chu ky vào để verify
  if (!verify.verify(publicKey, signature, 'hex'))
    throw new InvalidSignatureException()
}