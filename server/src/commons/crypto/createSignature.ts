const crypto = require("crypto");
import RSAKey from "./getRSAKey";

export default function createSignature (obj: any) {
  let data = JSON.stringify(obj)
  let signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  let sign = signer.sign(process.env.RSA_PRIVATE_KEY, "hex");
  return sign
}