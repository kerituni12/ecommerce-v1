import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Grid, Container, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { useSelector } from "react-redux";

import converPriceVND from "helpers/convertPriceVND";

const steps = ["Thông tin đặt hàng", "Thanh toán", "Hoàn thành"];

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

  const cartItems = useSelector((state) => state.cart.items);
  const selectCartItems = cartItems.filter((item) => item.checked);
  const subtotal = calculateSubtotal(selectCartItems);

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
        return <PaymentForm total={subtotal} handleBack={handleBack} />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  });

  React.useEffect(() => {
    console.log("checkout effect");
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <ListItemText primary="Tạm tính" />
                <ListItemSecondaryAction>
                  <Typography>đ{converPriceVND(subtotal)}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Phí vận chuyển" />
                <ListItemSecondaryAction>
                  <Typography>đ0</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <hr style={{ borderTop: "1px solid rgb(189 189 189)", width: "92%" }} />
              <ListItem>
                <ListItemText primary="Tổng cộng" />
                <ListItemSecondaryAction>
                  <Typography>đ{converPriceVND(subtotal)}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    position: "relative",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
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
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
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
