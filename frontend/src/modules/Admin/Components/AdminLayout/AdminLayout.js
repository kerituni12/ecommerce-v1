import React, { useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, CssBaseline } from "@material-ui/core";
import useIsomorphicLayoutEffect from "hooks/useLayoutEffect";

import SideBar from "modules/Admin/Components/Sidebar/Sidebar";
import Header from "modules/Admin/Components/Header/Header";
import Link from "next/link";
import DrawSidebar from "../Sidebar/DrawSidebar";
const drawerWidth = 200;
const drawerClose = 56;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appContent: {
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

function AdminLayout({ children }) {
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(true);
  const [smallScreen, setSmallScreen] = React.useState(1000 <= 960);

  const handleDrawerToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      window.innerWidth <= 960 ? setSmallScreen(true) : setSmallScreen(false);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <DrawSidebar toggle={toggle} smallScreen={smallScreen} handleDrawerToggle={handleDrawerToggle} />

      <div className={classes.appContent}>
        <Header toggle={toggle} handleToggle={handleDrawerToggle} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
