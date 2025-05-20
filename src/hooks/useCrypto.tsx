import { useEffect, useState } from "react";
import sodium from "libsodium-wrappers"
import { decryptData, encryptData } from "../utils/customEncrypt";

export type Party = 'kripto' | 'grafi';
type ExcludeSelf<T extends Party> = Exclude<Party, T>;
type PairKeys = {
  publicKey: PairKey;
  secretKey: PairKey;
}

type PairKey = {
  kripto: string;
  grafi: string;
}

const useCrypto = () => {
  const [publicKey, setPublicKey] = useState<{[key in 'kripto' | 'grafi']: string}>({
    kripto: '',
    grafi: ''
  });

  const [secretKey, setSecretKey] = useState<{[key in 'kripto' | 'grafi']: string}>({
    kripto: '',
    grafi: ''
  });

  useEffect(() => {
    const pairKeys = localStorage.getItem('pairKeys');
    if (pairKeys) {
      const decrypted = decryptData<PairKeys>(pairKeys);

      if (decrypted) {
        setPublicKey(decrypted.publicKey);
        setSecretKey(decrypted.secretKey);
      }
    } else {
      const initCrypto = async () => {
        await sodium.ready;
  
        const kripto = sodium.crypto_box_keypair();
        const grafi = sodium.crypto_box_keypair();
  
        setPublicKey({
          kripto: sodium.to_base64(kripto.publicKey),
          grafi: sodium.to_base64(grafi.publicKey)
        });
  
        setSecretKey({
          kripto: sodium.to_base64(kripto.privateKey),
          grafi: sodium.to_base64(grafi.privateKey)
        });
      };
  
      initCrypto();
    }

  }, []);

  useEffect(() => {
    if((publicKey.grafi && publicKey.kripto) && (secretKey.grafi && secretKey.kripto)) {
      const pairKeys = { publicKey, secretKey };

      const encrypted = encryptData<typeof pairKeys>(pairKeys);
      localStorage.setItem('pairKeys', encrypted);
    }
  }, [publicKey, secretKey]);

  const encryptMessage = async <F extends Party, T extends ExcludeSelf<F>>(from: F, to: T, message: string) => {
    await sodium.ready;

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES)
    
    console.log(publicKey, publicKey[to]);
    console.log(secretKey, secretKey[from]);
    console.log('nonce', sodium.to_base64(nonce));

    const encryptedMessage = sodium.to_base64(await sodium.crypto_box_easy(
      message,  
      nonce,
      sodium.from_base64(publicKey[to]),
      sodium.from_base64(secretKey[from]),
    ));

    return {
      nonce: sodium.to_base64(nonce),
      encryptedMessage
    };
  }

  const decryptMessage = async <F extends Party, T extends ExcludeSelf<F>>(from: F, to: T, encryptedMessage: string, nonce: string) => {
    await sodium.ready;

    console.log(publicKey, publicKey[from]);
    console.log(secretKey, secretKey[to]);
    
    const decryptedMessage = sodium.to_string(await sodium.crypto_box_open_easy(
      sodium.from_base64(encryptedMessage),
      sodium.from_base64(nonce),
      sodium.from_base64(publicKey[from]),
      sodium.from_base64(secretKey[to]),
    ));

    return decryptedMessage;
  }

  return {
    publicKey,
    encryptMessage,
    decryptMessage,
  }
};

export default useCrypto;
