import { AxiosError } from "axios";
import AxiosApi from "../Config/axios";
import { errorData, FormDataOrOther } from "../Type/constant";

export const API_GET_MENU_BY_SHOPID = <T>(
  id: FormDataOrOther<T>, 
): Promise<T> => {
  return AxiosApi.get<T>(`/api/menu/${id}`,) 
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


export const API_GET_PRODUCT_DETAIL = <T>(
    id: FormDataOrOther<T>, 
  ): Promise<T> => {
    return AxiosApi.get<T>(`/api/menu/item/${id}`,) 
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
  