import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Cookies from "js-cookie";
import api from "services/axios";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
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
          console.log(data);
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
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {order.orderItems.map((item) => (
            <ListItem className={classes.listItem} key={item.title}>
              <ListItemText primary={item.title} secondary={item.desc} />
              <Typography variant="body2">{item.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              $ {order.totalPrice}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item container direction="column" xs={12} sm={6}>
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
      </React.Fragment>
    );
  return <h1>Ban khong co order nao</h1>;
}
