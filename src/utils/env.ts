import type { ENVIRONMENT } from "../constants/env";

const getValues = (env: keyof typeof ENVIRONMENT): string => {
  const value = import.meta.env[`VITE_${env}`] as string | undefined;

  if (!value) {
    throw new Error(`Missing environment ${env} variable`);
  }

  return value;
};

export { getValues };
