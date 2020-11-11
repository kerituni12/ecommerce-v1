import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { useSelector } from "react-redux";

const steps = ["Shipping address", "Payment details", "Review your order"];

function calculateSubtotal(items) {
  let sum = 0;
  items.map((item) => {
    if (item.checked == true) {
      sum += item.price * item.quantity;
    }
  });
  return sum;
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const cartitems = useSelector((state) => state.cart.items);
  const subtotal = calculateSubtotal(cartitems);

  const handleNext = React.useCallback(() => {
    setActiveStep(activeStep + 1);
  });

  const handleBack = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  });

  const getStepContent = React.useCallback((step) => {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm total={subtotal} />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    } 
  });

  // Cai nay de su ly tien o backend
  // React.useEffect(() => {
  //   const getCart = async () => {
  //     const result = await api.get(`/api/product/get-price-for-products`, { items: cartitems });
  //     setCart(result);
  //   };
  //   getCart();
  // },[]);

  React.useEffect(() => {
    console.log("checkout effect");
  }, []);

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}

                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
