import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { Container, Grid, Box } from "@material-ui/core";
import CartItem from "./CartItem";

import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import convertPrice from "helpers/convertPriceVND";
import { getCart } from "@shop/Cart/cart.slice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "200px",
    flexGrow: 1,
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
  let sumVnd = convertPrice(sum);
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
      return (
        <CartItem
          key={item._id}        
          item={item}          
        />
      );
    });
  }

  return (
    <div className={classes.root}>
      {/* <Container className="paddingTopFixed">
        <AppBar position="static" style={StyleAppBar}>
          <Toolbar variant="dense"><Typography variant="h6">{props.messageCart}</Typography></Toolbar>
        </AppBar>
      </Container> */}

      <Container>
        <Grid container justify="space-evenly" alignItems="center" >
          <Grid item>
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
          <Grid item>
            <Container style={{display: "flex", flexDirection: "column", alignItems:"center", marginTop: "20px"}}>
              <Typography>Tạm tính: {subtotal(items)}</Typography>
            {/* Handle ship + subtotal */}
              <Typography>Tổng tiền: {subtotal(items)}</Typography>
              <Box>
                <Link href="/checkout">
                  <Button style={{marginTop: "20px"}}  variant="contained" color="primary">
                    Checkout
                  </Button>
                </Link>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CartContainer;
