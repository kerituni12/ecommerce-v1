import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "services/axios";
import Router from "next/router";

export const addOrder = createAsyncThunk("addOrder", async (order, { dispatch }) => {
  try {
    const { data } = await api.post(`/api/order`, order);
    if (data) {
      console.log(data);
      return data.order;
    }
  } catch (err) {
    console.log(err);
  }
  // dispatch(addCheckoutSuccess(item));
  // Router.push("/checkout");
  return;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    order: null,
  },
  reducers: {
    addCheckoutSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    addUserInfo: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { addCheckoutSuccess, addUserInfo } = checkoutSlice.actions;
export default checkoutSlice.reducer;
