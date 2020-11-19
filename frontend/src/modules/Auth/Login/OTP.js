import OtpInput from "react-otp-input";
import { Router, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { verifyOtp } from "./login.slice";

const useStyle = makeStyles((theme) => ({
  otp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    height: 180,
    justifyContent: "space-between",
  },
}));
function OTPVerify({ email, setRenderLogin }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState(null);

  const numberOfVerifyOtpFail = useSelector((state) => state.login.numberOfVerifyOtpFail);
  const handleChange = (otp) => setOtp(otp);
  const handleVerifyOtp = (otp) => {
    dispatch(verifyOtp({ email, otp }));
  };

  if (numberOfVerifyOtpFail > 2) {
    return <h1>You entered incorrectly more than 3 times</h1>;
  }
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item className={classes.otp}>
        <Typography>Nhập mã xác nhận OTP</Typography>
        <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />{" "}
        <Button color="secondary" variant="contained" onClick={() => handleVerifyOtp(otp)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default OTPVerify;
