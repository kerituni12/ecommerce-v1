import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "modules/Auth/Login/login.slice";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  topHeader: { display: "flex", justifyContent: "space-between", paddingTop: "10px" },
  borderRight: { marginLeft: "3px", marginRight: "3px", lineHeight: "1.6em" },
}));

function TopHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  return (
    <div className={classes.topHeader}>
      <div className={classes.sectionDesktop}>
        <Typography>Tải ứng dụng</Typography>
      </div>
      <div style={{ paddingRight: 20 }}>
        {isAuthenticated ? (
          <div className={classes.sectionDesktop}>
            <Link href="/user">
              <Typography>Dashboard</Typography>
            </Link>
            <div className={classes.borderRight}> | </div>

            <Typography onClick={() => dispatch(logout())}>Đăng xuất </Typography>
          </div>
        ) : (
          <div className={classes.sectionDesktop}>
            <Link href="/login">
              <Typography>Đăng nhập</Typography>
            </Link>
            <div className={classes.borderRight}> | </div>
            <Link href="/register">
              <Typography>Đăng kí </Typography>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopHeader;
