import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

import convertPrice from "helpers/convertPriceVND";
import { updateCart } from "./cart.slice";
import { useDispatch } from "react-redux";
import { handleChecked, deleteItemCart } from "./cart.slice";

const styleButton = {
  padding: 0,
  minWidth: 27,
  backgroundColor: "rgb(121 161 187)",
};

const styleQuantity = {
  padding: 3,
  fontWeight: 500,
};

function Cart(props) {
  const {item} = props;
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(handleChecked(item._id));
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left">
          <Checkbox
            checked={item.checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </TableCell>
        <TableCell>
          <img src={item.image} style={{ width: 50 }} />
        </TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell align="left">{convertPrice(item.price)}</TableCell>

        <TableCell align="center">
          <div style={{ width: 70 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={styleButton}
              onClick={() => {
                dispatch(updateCart({ item, quantity: item.quantity - 1 }));
              }}
            >
              -
            </Button>
            <span style={styleQuantity}>{item.quantity}</span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={styleButton}
              onClick={() => {
                dispatch(updateCart({ item, quantity: item.quantity + 1 }));
              }}
            >
              +
            </Button>
          </div>
        </TableCell>

        <TableCell align="center">₫{convertPrice(item.price * item.quantity)}</TableCell>
        <TableCell align="center">
          <Button
            onClick={() => {
              dispatch(deleteItemCart(item._id));
            }}
          >
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default Cart;
