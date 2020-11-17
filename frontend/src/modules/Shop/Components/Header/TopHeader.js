import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
  return (
    <div className={classes.topHeader}>
      <div className={classes.sectionDesktop}>
        <Typography>Tải ứng dụng</Typography>
      </div>
      <div style={{ paddingRight: 20 }}>
        <div className={classes.sectionDesktop}>
          <Link href="/login">
            <Typography>Đăng nhập</Typography>
          </Link>
          <div className={classes.borderRight}> | </div>
          <Link href="/register">
            <Typography>Đăng kí </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
