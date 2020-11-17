import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Container, Grid, Box, List, ListItem, Typography, Button, ListItemSecondaryAction } from "@material-ui/core";
import { Table, TableCell, TableHead, TableRow, TableContainer, ListItemText } from "@material-ui/core";
import CartItem from "./CartItem";

import convertPriceVND from "helpers/convertPriceVND";
import { getCart } from "@shop/Cart/cart.slice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 700,
  },
  tableHeader: {
    background: "#00acc1",
    color: "#ffffff"
  }
}));

const styleButton = {
  background: "#00acc1",
  color: "white",
};

const StyleAppBar = {
  background: "rgb(121 161 187)",
  marginTop: 20,
  color: "#e79413 !important",
};

function subtotal(items) {
  let sum = 0;
  items.map((item) => {
    if (item.checked == true) {
      sum += item.price * item.quantity;
    }
  });
  let sumVnd = convertPriceVND(sum);
  return sumVnd;
}

function CartContainer(props) {
  const classes = useStyles();
  const items = useSelector((state) => state.cart.items);
  console.log("items cart", items);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCart());
  }, []);
  let result;
  if (items) {
    result = items.map((item, index) => {
      return <CartItem key={item._id} item={item} />;
    });
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Sản Phẩm</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell align="left">Đơn Giá</TableCell>
                    <TableCell align="center">Số Lượng</TableCell>
                    <TableCell align="center">Thành Tiền</TableCell>
                    <TableCell align="center">Thao Tác</TableCell>
                  </TableRow>
                </TableHead>

                {result ? result : ""}
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={4}>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <ListItemText primary="Tạm tính" />
                  <ListItemSecondaryAction>
                    <Typography>đ{subtotal(items)}</Typography>
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
                    <Typography>đ{subtotal(items)}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <Link href="/checkout">
                  <Button variant="contained" color="primary" fullWidth>
                    Thanh toán
                  </Button>
                </Link>
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CartContainer;
