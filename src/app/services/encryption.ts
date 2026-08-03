import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Encryption {
  decrypt(data: string): any {
    try {
      const key = CryptoJS.enc.Utf8.parse(
        environment.keyString.padEnd(32, ' ')
      );
      const iv = CryptoJS.enc.Utf8.parse(
        environment.ivString.padEnd(16, ' ')
      );
      const encryptedDataBytes = CryptoJS.enc.Hex.parse(data);
      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: encryptedDataBytes
        } as any,
        key,
        {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      const decryptedText =
        decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error('Unable to decrypt');
      }
      return JSON.parse(decryptedText);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
