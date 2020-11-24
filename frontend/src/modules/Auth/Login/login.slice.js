import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "services/axios";
import Router from "next/router";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import Cookies2 from "js-cookie";

const cookies = new Cookies();

export const login = createAsyncThunk("login", async ({ email, password, setRenderLogin }, { dispatch }) => {
  try {
    const {
      data: { user, token, isOtpVerify },
    } = await api.post("/api/auth/login", { email, password });
    if (!isOtpVerify) {
      dispatch(authSuccess(user));
      Router.push("/");
    } else {
      // Bat de gui ma otp ve dt
      // await api.post("/api/auth/send-otp-auth", { email });
      const payload = token.split(".")[1];
      cookies.set("payloadClient", payload, { maxAge: 72000 });
      setRenderLogin(false);
      dispatch(needVerifyOtp());
    }
  } catch (err) {
    toast(err.response.data.message);
  }
});

export const verifyOtp = createAsyncThunk("verifyOtp", async ({ email, otp }, { dispatch }) => {
  //Cai nay dung neu xac nhan bang server nha
  const { data } = await api.post("/api/auth/verify-otp-auth", { email, otp });

  // Day la du lieu mau , khong dung trong deploy
  // const data = {};
  // data.status = "approvedd";
  //
  if (data.status === "approved") {
    const payload = cookies.get("payloadClient");
    const user = JSON.parse(atob(payload));
    dispatch(authSuccess(user));
    Router.push("/");
    return;
  }
  dispatch(verifyOtpFail());
});

export const logout = createAsyncThunk("logout", async (data, { dispatch }) => {
  Cookies2.remove("payloadClient");
  dispatch(logoutSuccess());
  Router.push("/");
});

const logInSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isOtpVerify: true,
    numberOfVerifyOtpFail: 0,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.numberOfVerifyOtpFail = 0;
    },
    needVerifyOtp: (state) => {
      state.isOtpVerify = true;
    },
    authSuccess: (state, action) => {
      state.isOtpVerify = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    verifyOtpFail: (state) => {
      state.numberOfVerifyOtpFail += 1;
    },
  },
});

export const { setUser, logoutSuccess, needVerifyOtp, authSuccess, verifyOtpFail } = logInSlice.actions;

export default logInSlice.reducer;
