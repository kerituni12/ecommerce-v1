import OtpInput from "react-otp-input";
import { Router, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { verifyOtp } from "./login.slice";

const useStyle = makeStyles((theme) => ({
  otp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: 30,
    height: 200,
    justifyContent: "space-between",
  },
  wrong: {
    color: "red",
  },
}));
function OTPVerify({ email, setRenderLogin }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState("");

  const numberOfVerifyOtpFail = useSelector((state) => state.login.numberOfVerifyOtpFail);
  const handleChange = (otp) => setOtp(otp);
  const handleVerifyOtp = (otp) => {
    if (otp.length !== 6) {
      toast("otp không hợp lệ");
    } else {
      dispatch(verifyOtp({ email, otp }));
    }
  };

  if (numberOfVerifyOtpFail > 2) {
    return (
      <Typography className={classes.wrong} variant="h3">
        Bạn đã nhập sai 3 lần
      </Typography>
    );
  }
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item className={classes.otp}>
        {numberOfVerifyOtpFail > 0 ? (
          <Typography className={classes.wrong}>Bạn đã nhập sai {numberOfVerifyOtpFail} lần</Typography>
        ) : null}
        <Typography>Nhập mã xác nhận OTP</Typography>
        <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />
        <Button color="secondary" variant="contained" onClick={() => handleVerifyOtp(otp)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default OTPVerify;
