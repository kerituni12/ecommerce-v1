import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "modules/Auth/Login/login.slice";
import productReducer from "modules/Shop/Product/product.slice";
import cartReducer from "modules/Shop/Cart/cart.slice";
import orderReducer from "modules/Shop/Order/order.slice";

export default combineReducers({
  login: loginReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
