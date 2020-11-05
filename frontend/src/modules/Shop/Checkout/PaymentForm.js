import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { FormControlLabel, FormControl, RadioGroup, Radio, CardContent, Card } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import Paypal from "./PayPal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  description: {
    display: "flex",
  },
  card: {
    marginBottom: "30px",
  },
}));

export default function PaymentForm(props) {
  const classes = useStyles();
  const [value, setValue] = useState("code");
  const [sdkReady, setSdkReady] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AdSub0mHnZXjq2Tg3E2-PX0fsxUBrlF4K39GXzKB30r8F6XplwmeH4IckASjiDIagQq1UGwCZVgYzoSR&currency=CAD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.root}>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container>
                    <Grid container justify="space-between">
                      <Grid item>
                        <FormControlLabel value="cod" control={<Radio />} label="COD" />
                        <Typography> : Thanh toán khi giao hàng</Typography>
                      </Grid>
                      <Grid item>
                        <img
                          src="https://img.ltwebstatic.com/images2_pi/2018/06/06/15282728552982326415.png"
                          alt="my image"
                        />
                      </Grid>
                    </Grid>
                    {value === "cod" && (
                      <Grid item sm={12}>
                        <Paypal />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item>
                      <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                      <Typography> : Thanh toán khi giao hàng</Typography>
                    </Grid>
                    <Grid item>
                      <img
                        src="https://img.ltwebstatic.com/images2_pi/2018/06/06/15282728552982326415.png"
                        alt="my image"
                      />
                    </Grid>
                    {value === "paypal" && (
                      <Grid item sm={12}>
                        <Paypal total={props.total} />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item>
                      <FormControlLabel value="vnpay" control={<Radio />} label="VNPay" />
                      <Typography> : Thanh toán khi giao hàng</Typography>
                    </Grid>
                    <Grid>
                      <img
                        src="https://img.ltwebstatic.com/images2_pi/2018/06/06/15282728552982326415.png"
                        alt="my image"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
