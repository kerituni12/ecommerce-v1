// api.js
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios;
