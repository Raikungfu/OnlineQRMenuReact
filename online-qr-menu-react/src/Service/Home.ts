import { AxiosError } from "axios";
import AxiosApi from "../Config/axios";
import { errorData, FormDataOrOther } from "../Type/constant";

export const API_INFO_COFFEE_SHOP = <T>(id: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>(`/api/CoffeeShops/Details/${id}`)
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
