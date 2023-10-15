import { createSlice } from "@reduxjs/toolkit";
import { errorToast, succesToast } from "../../utils/toast";

const initialState = {
  wishlist: [],
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWislisht: (state, action) => {
      action.payload.forEach((product) => {
        const productId = product?._id;
        const existingProduct = state.wishlist.find((p) => p._id === productId);
        if (!existingProduct) {
          state.wishlist.push(product);
        }
      });
    },
    addProductToWishlist: (state, action) => {
      const productId = action.payload._id;
      const existingProduct = state.wishlist.find(
        (product) => product._id === productId
      );

      if (!existingProduct) {
        state.wishlist.push(action.payload);
        succesToast(`${action.payload?.name} added to wishlist`);
      } else {
        errorToast(`${action.payload?.name} already exists in wishlist`);
      }
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
  updateWislisht,
  addProductToWishlist,
  removeProductFromWishlist,
  wishlistLogout,
} = wishlistSlice.actions;

const wishlistReducer = wishlistSlice.reducer;

export default wishlistReducer;
