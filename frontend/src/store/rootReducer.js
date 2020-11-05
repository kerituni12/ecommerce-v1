import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "modules/Auth/Login/login.slice";
import productReducer from "modules/Shop/Product/product.slice";
import cartReducer from "modules/Shop/Cart/cart.slice";
import checkoutReducer from "modules/Shop/Checkout/checkout.slice";

export default combineReducers({
  login: loginReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});
