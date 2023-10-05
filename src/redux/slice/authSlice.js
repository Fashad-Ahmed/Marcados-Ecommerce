import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configs from "../config";
import { post } from "../../api";
const initialState = {
  email: null,
  user: null,
  userToken: null,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    let response = await post(configs.endpoints.auth.login, data, false);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const signup = createAsyncThunk("user/create", async (data) => {
  try {
    let response = await post(configs.endpoints.user.createUser, data, false);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data) => {
    try {
      let response = await post(
        configs.endpoints.auth.forgetPassword,
        data,
        false
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const verificationCode = createAsyncThunk(
  "auth/verificationCode",
  async (data) => {
    try {
      let response = await post(configs.endpoints.auth.verifyOtp, data, false);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const setPasswword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      let response = await post(
        configs.endpoints.auth.resetPassword,
        data,
        false
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createFeedback = createAsyncThunk(
  "inquiry/create",
  async (data) => {
    try {
      let response = await post(
        configs.endpoints.inquiry.createInquiry,
        data,
        false
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (data) => {
    try {
      let response = await post(
        configs.endpoints.newsletter.subscribe,
        data,
        false
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data) => {
    try {
      let response = await post(
        configs.endpoints.user.changePassword,
        data,
        false
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.email = action.payload;
      state.user = action.payload.data;
      state.userToken = action.token;
    },
    userSignup: (state, action) => {
      state.email = action.payload;
    },
    userLogout: (state, action) => {
      state.email = null;
      state.user = null;
      state.userToken = null;
    },
  },
});

export const { userLogin, userSignup, userLogout } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
