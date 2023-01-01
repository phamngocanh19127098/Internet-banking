import crypto from "crypto";
import RSAKey from "./rsa-key/getRSAKey";

export default function createSignature (obj: any) {
  let data = JSON.stringify(obj)
  let signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  let sign = signer.sign(RSAKey.privateKey, "hex");
  return sign
}