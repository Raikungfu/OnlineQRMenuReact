import { AxiosError } from "axios";
import AxiosApi from "../Config/axios";
import { errorData } from "../Type/constant";
import { SendOrderItem } from "../Page/Checkout";

export const API_ORDER = (
  items: SendOrderItem[],
  paymentMethod: string,
  coffeeShopId: string,
  tableId: string,
  userId?: string
): Promise<any> => {
  return AxiosApi.post("/api/order", {
    items,
    paymentMethod,
    coffeeShopId,
    tableId,
    userId,
  })
    .then((response) => {
      if (response.data && response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Error send order!");
      }
    })
    .catch((error) => {
      throw error;
    });
};
