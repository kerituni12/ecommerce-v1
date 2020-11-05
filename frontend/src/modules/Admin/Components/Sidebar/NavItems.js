import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {Divider, Collapse, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

import NavItem from "./NavItem";

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      "&.active": {
        background: "rgba(0, 0, 0, 0.08)",
        "& .MuiListItemIcon-root": {
          color: "#fff",
        },
      },
    },
    menuItemIcon: {
      color: "#97c05c",
    },
  })
);

const AppMenuItem = (props) => {
  const { name, link, Icon, items = [] } = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <NavItem className={classes.menuItem} link={link} onClick={handleClick}>
      {/* Display an icon if any */}
      <ListItem>
        {!!Icon && (
          <ListItemIcon className={classes.menuItemIcon}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </ListItem>
    </NavItem>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

export default AppMenuItem;
