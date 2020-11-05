import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "services/axios";
import Router from "next/router";

export const addCheckout = createAsyncThunk("addCheckout", async (item, { dispatch }) => {
  dispatch(addCheckoutSuccess(item));
  Router.push("/checkout");
  return;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    items: [],
    user:null,
  },
  reducers: {
    addCheckoutSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    addUserInfo: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { addCheckoutSuccess , addUserInfo} = checkoutSlice.actions;
export default checkoutSlice.reducer;
