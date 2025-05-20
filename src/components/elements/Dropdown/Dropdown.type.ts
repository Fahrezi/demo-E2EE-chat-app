export type Props = {
  header: string;
  body: {
    [key in bodykeys]: string | number | boolean;
  };
}

export type bodykeys = 'message' | 'userId' | 'nonce' | 'encryptedMessage' | 'isSelf';
