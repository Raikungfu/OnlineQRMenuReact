export const API_BASE_URL: string = (() => {
  const mode: string = import.meta.env.VITE_MODE;
  const urls: Record<string, string> = {
    DEV: import.meta.env.VITE_DEV_API_URL,
    PROD: import.meta.env.VITE_PROD_API_URL,
  };

  return urls[mode];
})();

export type FormDataOrOther<T> = T;

export interface errorData {
  error?: string;
  status?: number;
}
