import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OTP from "./OTP";
import Login from "./Login";

function LoginContainer() {
  const [isRenderLogin, setRenderLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const isOtpVerify = useSelector((state) => state.login.isOtpVerify);

  if (isOtpVerify && !isRenderLogin) return <OTP email={email} />;
  return isRenderLogin ? <Login setEmail={setEmail} setRenderLogin={setRenderLogin} /> : null;
}

export default LoginContainer;
