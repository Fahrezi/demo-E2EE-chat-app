import { getValues } from "./env";

const SECRET_KEY = getValues('SECRET_KEY');

export const encryptData = <T>(data: T): string => {
  const json = JSON.stringify(data);
  return btoa(
    [...json]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join(''),
  );
};

export const decryptData = <T>(data: string): T | null => {
  try {
    const decoded = [...atob(data)]
      .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)))
      .join('');
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
};
