/**
 * AES加密工具
 */

import CryptoJS from 'crypto-js' // 引用AES源码js
// const key = CryptoJS.enc.Utf8.parse( '1234123412ABCDEF ')  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量

/**
 * 加密
 * @param word 明文
 * @param key 秘钥
 * mode和padding 需要与服务端相对应
 */
function encrypt (word, key) {
  let aesKey = CryptoJS.enc.Utf8.parse(key)
  // let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(word, aesKey, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * 解密
 * @param word 密文
 * @param key 秘钥
 * mode和padding 需要与服务端相对应
 */
function decrypt (word, key) {
  let aesKey = CryptoJS.enc.Utf8.parse(key)
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, aesKey, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}

export default {
  decrypt,
  encrypt
}
