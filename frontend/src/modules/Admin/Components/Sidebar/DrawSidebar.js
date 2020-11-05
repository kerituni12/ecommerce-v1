import { Drawer } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SideBar from "./Sidebar";
import { drawConfigs } from "./configSidebar";

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawConfigs.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: drawConfigs.drawerClose,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  drawerPaper: {
    width: drawConfigs.drawerWidth,
  },
}));

function DrawSidebar({ smallScreen, toggle, handleDrawerToggle }) {  
  const classes = useStyles();
  return smallScreen ? (
    <Drawer
      variant="temporary"
      open={toggle}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better toggle performance on mobile.
      }}
    >
      <SideBar isToggle={toggle} />
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: toggle,
        [classes.drawerClose]: !toggle,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: toggle,
          [classes.drawerClose]: !toggle,
        }),
      }}
    >
      <SideBar isToggle={toggle} />
    </Drawer>
  );
}

export default React.memo(DrawSidebar);
