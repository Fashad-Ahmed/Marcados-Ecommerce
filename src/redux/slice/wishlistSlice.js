import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../data/products";
import { errorToast, succesToast } from "../../utils/toast";

const initialState = [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductToWishlist: (state, action) => {
      const product = state.cart.find((p) => p._id === action.payload);
      if (product) {
        state.wishlist.push(product);
      }
      succesToast("Item added to wishlist");
    },
    removeProductFromWishlist: (state, action) => {
      const index = state.wishlist.findIndex((p) => p._id === action.payload);
      if (index !== -1) {
        state.wishlist.splice(index, 1);
        errorToast("Item removed from wishlist");
      }
    },
    increaseWishlistQuantity: (state, action) => {
      const product = state.wishlist.find((p) => p._id === action.payload);
      if (product) {
        product.quantity += 1;
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
