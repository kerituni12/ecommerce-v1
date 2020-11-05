import React, { useEffect } from "react";
import Link from "next/link";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Container, Tooltip } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";

import LogoWeb from "@shop/images/LogoWeb.png";
import SearchField from "../SearchField/SearchField";
import TopHeader from "./TopHeader";

import { useDispatch } from "react-redux";
import { getCart } from "@shop/Cart/cart.slice";
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

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
}));

const styleCart = {
  fontSize: 25,
  color: "white",
  marginLeft: 20,
};

const styleAppBar = {
  position: "fixed",
  zIndex: 3,
  backgroundColor: "#00acc1",
};

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCart());
  },[]);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={styleAppBar}>
        <Container fixed>
          <TopHeader />
          <Toolbar>
            <Link href="/">
              <a>
                <img src={LogoWeb} className={classes.logoWeb} />
              </a>
            </Link>
            <SearchField />
            <div className={classes.grow} />

            <Link href="/cart">
              <LightTooltip title={"Chưa Có sản phẩm"} arrow placement="bottom-end">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon style={styleCart} className="show">
                    <NotificationsIcon />
                  </ShoppingCartIcon>
                </Badge>
              </LightTooltip>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
