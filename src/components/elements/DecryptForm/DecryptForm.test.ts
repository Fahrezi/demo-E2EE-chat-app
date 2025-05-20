export type Data = {
  encryptedMessage: string;
  from: Party | string;
  to: Party | string;
  nonce: string;
};

export type Party = 'kripto' | 'grafi'
