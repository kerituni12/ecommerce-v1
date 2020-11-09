import { makeStyles } from "@material-ui/core/styles";
import { Typography, ButtonGroup, Button } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function TopHeader() {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button color="secondary" variant="contained">
        <Typography>Tải ứng dụng</Typography>
      </Button>
      <ButtonGroup variant="contained" color="secondary" size="large" aria-label="contained primary button group">
        <Button>
          <Link href="/login">
            <Typography>Đăng nhập</Typography>
          </Link>
        </Button>
        <Button>
          <Link href="/register">
            <Typography>Đăng kí</Typography>
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TopHeader;
