import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../data/products";
import { errorToast, succesToast } from "../../utils/toast";

const initialState = [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductToWishlist: (state, action) => {
      for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].id === action.payload) {
          state.push(data.products[i]);
        }
      }
      succesToast("Item added to wishlist");
    },
    removeProductFromWishlist: (state, action) => {
      console.log(action.payload);
      errorToast("Item removed from wishlist");
      return state.filter((product) => product.id !== action.payload);
    },
    increaseWishlistQuantity: (state, action) => {
      for (let i = 0; i < state.wishlist.length; i++) {
        if (state[i].id === action.payload.id) {
          state[i].quantity += 1;
        }
      }
    },
    wishlistLogout: () => {
      return initialState;
    },
  },
});

export const {
  addProductToWishlist,
  removeProductFromWishlist,
  wishlistLogout,
} = wishlistSlice.actions;

const wishlistReducer = wishlistSlice.reducer;

export default wishlistReducer;
