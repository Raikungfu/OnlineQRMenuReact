
import { AxiosError } from "axios";
import AxiosApi from "../Config/axios";
import { errorData, FormDataOrOther } from "../Type/constant";

export const API_INFO_COFFEE_SHOP = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/infoCoffeeShop", data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_GET_PRODUCTS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/api/menu/", data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_GET_CATEGORIES = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/categories", data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};