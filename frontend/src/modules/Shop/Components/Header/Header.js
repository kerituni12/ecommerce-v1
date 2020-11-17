import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Badge, Container, Tooltip, IconButton } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";

import SearchField from "../SearchField/SearchField";
import TopHeader from "./TopHeader";

import { getCart } from "@shop/Cart/cart.slice";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartInfo = getCartInfo(cartItems);
  React.useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={styleAppBar}>
        <Container fixed>
          <TopHeader />
          <Toolbar className={classes.toolBar}>
            <Link href="/">
              <a>
                <img src="/LogoWeb.png" alt="logo web shop sale" className={classes.logoWeb} />
              </a>
            </Link>
            <SearchField />
            <div className={classes.grow} />

            <Link href="/cart">
              <LightTooltip
                title={cartItems.length > 0 ? <div style={{ padding: 5 }}>{cartInfo}</div> : "Chưa Có sản phẩm"}
                arrow
                placement="bottom-end"
              >
                <IconButton style={styleCart}>
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon fontSize="large" className="show">
                      <NotificationsIcon />
                    </ShoppingCartIcon>
                  </Badge>
                </IconButton>
              </LightTooltip>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logoWeb: {
    height: "90px",
  },
  toolBar: {
    maxHeight: "80px",
  },
}));

const styleCart = {
  color: "white",
  marginLeft: 20,
};

const styleAppBar = {
  position: "fixed",
  zIndex: 3,
  backgroundColor: "#00acc1",
};

const getCartInfo = (cartItems) =>
  cartItems.map((item) => {
    return (
      <div style={{ display: "flex", marginBottom: 5 }} key={item._id}>
        <img src={item.image} style={{ width: 40, border: "1px solid #dadada" }} />
        <h3
          style={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
            marginLeft: 4,
          }}
        >
          {item.title}
        </h3>
        <h5 style={{ color: "#696969", marginLeft: 1 }}>x{item.quantity}</h5>
      </div>
    );
  });

export default Header;
