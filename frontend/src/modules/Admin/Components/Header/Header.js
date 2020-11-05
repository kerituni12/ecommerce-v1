import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function Header({ handleToggle }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="isToggle drawer"
          onClick={handleToggle}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
