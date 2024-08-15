
import { AxiosError } from "axios";
import AxiosApi from "../Config/axios";
import { errorData, FormDataOrOther } from "../Type/constant";


export const API_PAYPAL_CHECKOUT = (amount: string): Promise<any> => {
    return AxiosApi.post('/api/checkout/paypal', { amount })
      .then((response) => {
        if (response.data && response.data) {
          return response.data;
        } else {
          const error = response.error as AxiosError;
          const x = error.response?.data as errorData;
          throw new Error(x.error || "Error creating PayPal payment!");
        }
      })
      .catch((error) => {
        throw error;
      });
  };