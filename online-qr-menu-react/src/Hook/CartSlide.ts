import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SizeOption {
  option: string;
  price: number;
  cost: number;
  quantity: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  sizeOptions: SizeOption[];
  note: string;
  price: number;
  cost: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;

        newItem.sizeOptions.forEach((newSizeOption) => {
          const existingSizeOption = existingItem.sizeOptions.find(
            (sizeOption) => sizeOption.option === newSizeOption.option
          );

          if (existingSizeOption) {
            existingSizeOption.quantity += newSizeOption.quantity;
          } else {
            existingItem.sizeOptions.push(newSizeOption);
          }
        });

        existingItem.note = newItem.note;
      } else {
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToLocalStorage(state.items);
    },
    removeOptionItemFromCart: (
      state,
      action: PayloadAction<{ productId: number; option: string }>
    ) => {
      const { productId, option } = action.payload;

      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        item.sizeOptions = item.sizeOptions
          .map((sizeOption) => {
            if (sizeOption.option === option) {
              return {
                ...sizeOption,
                quantity: 0,
              };
            }
            return sizeOption;
          })
          .filter((sizeOption) => sizeOption.quantity > 0);

        if (item.sizeOptions.length === 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }
      }

      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        saveCartToLocalStorage(state.items);
      }
    },
    updateSizeOptionQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        option: string;
        quantity: number;
      }>
    ) => {
      const { productId, option, quantity } = action.payload;

      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        item.sizeOptions = item.sizeOptions
          .map((sizeOption) => {
            if (sizeOption.option === option) {
              return {
                ...sizeOption,
                quantity: quantity,
              };
            }
            return sizeOption;
          })
          .filter((sizeOption) => sizeOption.quantity > 0);

        if (item.sizeOptions.length === 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }
      }

      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateSizeOptionQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
