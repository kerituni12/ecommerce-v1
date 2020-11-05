import OtpInput from "react-otp-input";
import { Router, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { verifyOtp } from "./login.slice";

function OTPVerify({ email, setRenderLogin }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState(null);

  const numberOfVerifyOtpFail = useSelector((state) => state.login.numberOfVerifyOtpFail);
  const handleChange = (otp) => setOtp(otp);
  const handleVerifyOtp = (otp) => {
    console.log(email, otp);
    dispatch(verifyOtp({ email, otp }));
  };

  if (numberOfVerifyOtpFail > 2) {
    return <h1>You entered incorrectly more than 3 times</h1>;
  }
  return (
    <>
      <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />{" "}
      <Button color="secondary" variant="contained" onClick={() => handleVerifyOtp(otp)}>
        Submit
      </Button>
    </>
  );
}

export default OTPVerify;
