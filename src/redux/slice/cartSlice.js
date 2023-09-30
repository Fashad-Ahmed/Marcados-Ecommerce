import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../data/products";
import { errorToast, succesToast } from "../../utils/toast";
import configs from "../config";
import { get } from "../../api";

const initialState = {
  cart: [],
}

export const getOrders = createAsyncThunk("get/order", async () => {
  try {
    let response = await get(configs.endpoints.checkout.getOrder);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const createOrder = createAsyncThunk("create/order", async (data) => {
  try {
    let response = await get(
      configs.endpoints.checkout.createOrder,
      data,
      false
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      console.log(state.cart);
      state.cart.push(action.payload);
      succesToast("Item added to cart");
      // const product = state.products.find((p) => p._id === action.payload);
      // if (product) {

      // }
    },
    removeProductFromCart: (state, action) => {
      const index = state.cart.findIndex((p) => p._id === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
        errorToast("Item removed from cart");
      }
    },
    increaseCartQuantity: (state, action) => {
      const product = state.cart.find((p) => p._id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity++;
        } else {
          product.quantity = 2;
        }
      }
    },

    decreaseCartQuantity: (state, action) => {
      const product = state.cart.find((p) => p._id === action.payload);
      if (product) {
        if (product.quantity < 1) {
          product.quantity = 1;
        } else {
          product.quantity--;
        }
      }
    },
    logout: () => {
      return initialState
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  logout,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
