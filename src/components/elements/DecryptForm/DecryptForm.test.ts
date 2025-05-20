export type Data = {
  encryptedMessage: string;
  from: 'kripto' | 'grafi' | '';
  to: 'kripto' | 'grafi' | '';
  nonce: string;
};
