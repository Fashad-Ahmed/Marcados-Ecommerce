import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configs from "../config";
import { get, post } from "../../api";
const initialState = {
  privacy: null,
  terms: null,
  about: null,
  zipCode: null,
};

export const getTerms = createAsyncThunk("content/terms", async () => {
  try {
    let response = await get(configs.endpoints.content.terms);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});
export const getAbout = createAsyncThunk("content/about", async () => {
  try {
    let response = await get(configs.endpoints.content.aboutUs);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});
export const getPolicy = createAsyncThunk("content/policy", async () => {
  try {
    let response = await get(configs.endpoints.content.privacyPolicy);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const getZip = createAsyncThunk("postcode/get", async () => {
  try {
    let response = await get(configs.endpoints.content.zip);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: {
    [getTerms.fulfilled]: (state, { payload }) => {
      state.terms = payload?.data?.content;
    },
    [getPolicy.fulfilled]: (state, { payload }) => {
      state.privacy = payload?.data?.content;
    },
    [getAbout.fulfilled]: (state, { payload }) => {
      state.about = payload?.data?.content;
    },
    [getZip.fulfilled]: (state, { payload }) => {
      state.zipCode = payload?.data;
    },
  },
});

export const {} = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
