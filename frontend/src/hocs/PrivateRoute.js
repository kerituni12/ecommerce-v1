import { useSelector, useDispatch } from "react-redux";
import { authSuccess } from "modules/Auth/Login/login.slice";
import Router from "next/router";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isOtpVerify } = useSelector(({ login }) => ({
    isAuthenticated: !!login.isAuthenticated,
    isOtpVerify: login.isOtpVerify,
  }));

  if (!isAuthenticated) {
    // Restore authenticated from cookies
    const payload = cookies.get("payloadClient");
    if (payload && !isOtpVerify) {
      const user = JSON.parse(atob(payload));
      dispatch(authSuccess(user));
      return null;
    }
    Router.push("/login");
    return null;
  }
  return children;
}

function AdminRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isOtpVerify, isAdmin } = useSelector(({ login }) => ({
    isAuthenticated: !!login.isAuthenticated,
    isOtpVerify: login.isOtpVerify,
    isAdmin: login.user.role === "admin",
  }));

  if (!isAuthenticated || !isAdmin) {
    // Restore authenticated from cookies
    const payload = cookies.get("payloadClient");
    if (payload && !isOtpVerify) {
      const user = JSON.parse(atob(payload));
      if (user.role === "admin") {
        dispatch(authSuccess(user));
        return null;
      }
    }
    Router.push("/login");
    return null;
  }
  return children;
}
export { PrivateRoute, AdminRoute };
