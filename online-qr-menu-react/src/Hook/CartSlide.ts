import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SizeOption {
  size: string;
  option: string;
  quantity: number;
}

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  sizeOptions: SizeOption[];
  note: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.productId === newItem.productId);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity;

        newItem.sizeOptions.forEach(newSizeOption => {
          const existingSizeOption = existingItem.sizeOptions.find(
            sizeOption => sizeOption.size === newSizeOption.size && sizeOption.option === newSizeOption.option
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
      state.items = state.items.filter(item => item.productId !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        saveCartToLocalStorage(state.items);
      }
    },
    updateSizeOptionQuantity: (state, action: PayloadAction<{ productId: number; size: string; option: string; quantity: number }>) => {
      const { productId, size, option, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      
      if (existingItem) {
        const existingSizeOption = existingItem.sizeOptions.find(
          sizeOption => sizeOption.size === size && sizeOption.option === option
        );

        if (existingSizeOption) {
          existingSizeOption.quantity = quantity;
          saveCartToLocalStorage(state.items);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, updateSizeOptionQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
