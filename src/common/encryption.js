import { secretPass } from "./constant";
const CryptoJS = require("crypto-js");

export const encryptData = (key) => {
  const data = CryptoJS.AES.encrypt(JSON.stringify(key), secretPass).toString();
  return data;
};
