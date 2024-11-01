import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../Type/constant";

interface AxiosApiResponse<T> {
  data: T | null;
  error: object | null;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

const AxiosApi = {
  get: async <T>(url: string, params?: T): Promise<AxiosApiResponse<T>> => {
    try {
      const response = await api.get<T>(url, { params });
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  post: async <T>(url: string, data: T): Promise<AxiosApiResponse<T>> => {
    try {
      const response = await api.post<T>(url, data);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  put: async <T>(url: string, data: T): Promise<AxiosApiResponse<T>> => {
    try {
      const response = await api.put<T>(url, data);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  patch: async <T>(url: string, data: T): Promise<AxiosApiResponse<T>> => {
    try {
      const response = await api.patch<T>(url, data);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  delete: async <T>(url: string): Promise<AxiosApiResponse<T>> => {
    try {
      const response = await api.delete<T>(url);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else {
        return { data: null, error: null };
      }
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },
};

export default AxiosApi;
