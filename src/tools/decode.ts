import * as NodeRSA from 'node-rsa';
import { privateKey } from '../keys';
import { AES, enc, mode, pad } from 'crypto-js';

class Encrypt {
  encryptStr: string;
  encryptKey: string;
}

export class Decode<T> {
  /**
   * @description: rsa解密
   * @param {string} data: 密文
   * @return {*}: 明文
   */
  public decryptKey(data: string): string {
    const decrypt = new NodeRSA(privateKey);
    decrypt.setOptions({ encryptionScheme: 'pkcs1' });
    return decrypt.decrypt(data, 'utf8');
  }

  /**
   * @description aes解密
   * @param {string} word 密文
   * @param {string} keyStr 秘钥
   * @return {*} 明文
   */
  public decryptStr(word, keyStr): string {
    const key = enc.Utf8.parse(keyStr);
    const decrypt = AES.decrypt(word, key, {
      mode: mode.ECB,
      padding: pad.Pkcs7,
    });
    return enc.Utf8.stringify(decrypt).toString();
  }

  /**
   * @description Encrypt对象解密
   * @param {Encrypt} encrypt Encrypt类的实例对象
   * @return {*} 解密出来的对象
   */
  public decrypt(encrypt: Encrypt): T {
    const key = this.decryptKey(encrypt.encryptKey);
    const data = this.decryptStr(encrypt.encryptStr, key);
    return JSON.parse(data);
  }
}
