import React from "react";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, ListItemText, List, ListItem } from "@material-ui/core";

import api from "services/axios";
import converPriceVND from "helpers/convertPriceVND";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  image: {
    width: "100%",
  },
}));

export default function Order() {
  const classes = useStyles();
  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const order = Cookies.get("orderId");
      try {
        const { data } = await api.get(`/api/order/${order}`);
        if (data) {
          setOrder(data.order);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (!!order)
    return (
      <Container className={classes.root}>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {order.orderItems.map((item) => (
                <ListItem className={classes.listItem} key={item.title}>
                  <ListItemText primary={item.title} secondary={item.desc} />
                  <ListItemText primary={`x${item.quantity}`} secondary={item.desc} />
                  <Typography variant="body2">đ{converPriceVND(item.price)}</Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  đ{converPriceVND(order.totalPrice)}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2} justify="space-between">
              <Grid item>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Shipping
                </Typography>
                <Typography gutterBottom>{order.user.name}</Typography>
                <Typography gutterBottom>
                  {Object.entries(order.shipping)
                    .map(([key, value]) => value)
                    .join(", ")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Payment details
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Payment Method</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>: {order.payment.paymentMethod}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Payment Status </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>: {order.isPaid + ""}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <img src="/thank-for-purchase.png" className={classes.image} />
          </Grid>
        </Grid>
      </Container>
    );
  return <h1>Ban khong co order nao</h1>;
}
