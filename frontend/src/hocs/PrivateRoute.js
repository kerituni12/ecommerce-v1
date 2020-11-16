import { useSelector, useDispatch } from "react-redux";
import { authSuccess } from "modules/Auth/Login/login.slice";
import Router from "next/router";

import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isOtpVerify } = useSelector(({ login }) => ({
    isAuthenticated: !!login.isAuthenticated,
    isOtpVerify: login.isOtpVerify,
  }));

  if (!isAuthenticated) {
    // Restore authenticated from cookies
    const payload = Cookies.get("payload");    
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

export { PrivateRoute };
