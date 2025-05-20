export type Props = {
  header: string;
  body: {
    [key in bodykeys]: string | number;
  };
}

export type bodykeys = 'message' | 'userId' | 'nonce' | 'encryptedMessage' | 'isSelf';
