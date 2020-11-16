import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  CardContent,
  Card,
  Button,
  Typography,
  Grid,
  Checkbox,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Paypal from "./PayPal";
import VnPay from "./VnPay";
import COD from "./COD";

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
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const defaultPayment = {
  paymentMethod: "cod",
};

class Order {
  constructor(user, shipping, orderItems, itemsPrice, payment = defaultPayment) {
    this.isPaid = false;
    this.isDelivered = false;
    this.orderItems = orderItems;
    this.user = user;
    this.shipping = shipping;
    this.itemsPrice = itemsPrice;
    this.shippingPrice = 0;
    this.totalPrice = this.shippingPrice + this.itemsPrice;
    this.payment = payment;
  }
}

export default function PaymentForm({ total, handleBack }) {
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState("code");
  const [sdkReady, setSdkReady] = useState(false);

  const { user, shipping } = useSelector((state) => state.order.order);
  const cartItems = useSelector((state) => state.cart.items);

  const order = new Order(user, shipping, cartItems, total);

  console.log(order);

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    order.payment.paymentMethod = event.target.value;
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AdSub0mHnZXjq2Tg3E2-PX0fsxUBrlF4K39GXzKB30r8F6XplwmeH4IckASjiDIagQq1UGwCZVgYzoSR&currency=USD`;
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
            <RadioGroup aria-label="gender" name="gender1" value={paymentMethod} onChange={handleChange}>
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
                    {paymentMethod === "cod" && (
                      <Grid item sm={12}>
                        <COD order={order} />
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
                    {paymentMethod === "paypal" && (
                      <Grid item sm={12}>
                        <Paypal order={order} />
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
                    {paymentMethod === "vnpay" && (
                      <Grid item sm={12}>
                        <VnPay order={order} />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleBack}>Back</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
