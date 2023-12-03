import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorToast, succesToast } from "../../utils/toast";
import configs from "../config";
import { get, post } from "../../api";

const initialState = {
  cart: [],
  discountValue: 0,
  discountId: null,
  paymentByPaypal: false,
};

export const getOrders = createAsyncThunk("get/order", async () => {
  try {
    let response = await get(configs.endpoints.checkout.getOrder);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const handlePayment = createAsyncThunk("get/payment", async (data) => {
  try {
    let response = await get(configs.endpoints.checkout.handlePayment, data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const createOrder = createAsyncThunk("create/order", async (data) => {
  try {
    let response = await post(
      configs.endpoints.checkout.createOrder,
      data,
      false
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const applyCoupon = createAsyncThunk("apply/coupon", async (data) => {
  try {
    let response = await get(configs.endpoints.checkout.applyCoupon, {
      title: data,
    });
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
      const existingProduct = state.cart.find(
        (p) => p._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      // succesToast("Item added to cart");
    },

    removeProductFromCart: (state, action) => {
      const index = state.cart.findIndex((p) => p._id === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
        // errorToast("Item removed from cart");
      }
    },
    increaseCartQuantity: (state, action) => {
      const product = state.cart.find((p) => p._id === action.payload);
      if (product && product.quantity > 0) {
        product.quantity++;
        // succesToast(
        //   `${product?.name} quantity increased upto ${product?.quantity}`
        // );
      }
    },
    decreaseCartQuantity: (state, action) => {
      const product = state.cart.find((p) => p._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity--;
        // errorToast(
        //   `${product?.name} quantity decreased upto ${product?.quantity}`
        // );
      }
    },
    addDiscount: (state, action) => {
      state.discountValue = action.payload;
    },
    addDiscountId: (state, action) => {
      state.discountId = action.payload;
    },
    removeDiscount: (state) => {
      state.discountValue = 0;
    },
    removeDiscountId: (state) => {
      state.discountId = null;
    },
    changePayment: (state, action) => {
      state.paymentByPaypal = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const {
  addProductToCart,
  removeDiscount,
  removeDiscountId,
  removeProductFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  addDiscount,
  addDiscountId,
  changePayment,
  logout,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
