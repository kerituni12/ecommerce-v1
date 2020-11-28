import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "services/axios";

export const getProductList = createAsyncThunk("getProductList", async (_, { dispatch }) => {
  const { data } = await api.get("/api/product");
  if (data) dispatch(getProductListSuccess(data.products));
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
  },
  reducers: {
    getProductListSuccess: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getProductListSuccess } = productSlice.actions;
export default productSlice.reducer;
