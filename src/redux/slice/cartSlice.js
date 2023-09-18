import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../data/products";
import { errorToast, succesToast } from "../../utils/toast";
import configs from "../config";
import { get } from "../../api";

const initialState = [];

export const getOrders = createAsyncThunk("get/order", async (data) => {
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
      for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].id === action.payload) {
          let newProduct = data.products[i];
          state.unshift(newProduct);
        }
      }
      succesToast("Item added to cart");
    },
    removeProductFromCart: (state, action) => {
      console.log(action.payload);
      errorToast("Item removed from cart");

      return state.filter((product) => product.id !== action.payload);
    },
    increaseCartQuantity: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload) {
          if (state[i].quantity > 1) {
            state[i].quantity++;
          } else {
            state[i].quantity = 2;
          }
        }
      }
    },
    decreaseCartQuantity: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload) {
          if (state[i].quantity < 1) {
            state[i].quantity = 1;
          } else {
            state[i].quantity--;
          }
        }
      }
    },
    logout: () => {
      return initialState;
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
