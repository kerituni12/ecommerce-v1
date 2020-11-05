import { Container, Grid, Toolbar } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CategoryIcon from "@material-ui/icons/Category";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import styles from "./service.module.scss";

function Service() {
  return (
    <>
      <Container>
        <Toolbar variant="dense" style={{ backgroundColor: "#FFF", marginTop: 20 }}>
          <h4 style={{ color: "rgb(0, 172, 193)" }}> DỊCH VỤ </h4>
        </Toolbar>
        <div style={{ backgroundColor: "rgb(0, 172, 193)", width: "100%", height: 2 }}></div>
      </Container>

      <Container>
        <Toolbar variant="dense" style={{ backgroundColor: "#FFF", paddingTop: 25 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} xs={6}  md={3}>
              <LocalShippingIcon className={styles.icon} />
              <h3 style={{ textAlign: "center", color: "#e79413" }}>Giao Hàng Miễn Phí</h3>
            </Grid>

            <Grid item xs={12} xs={6}  md={3}>
              <CategoryIcon className={styles.icon} />
              <h3 style={{ textAlign: "center", color: "#e79413" }}>Đa Dạng Sản Phẩm</h3>
            </Grid>

            <Grid item xs={12} xs={6}  md={3}>
              <LocalOfferIcon className={styles.icon} />
              <h3 style={{ textAlign: "center", color: "#e79413" }}>Giá Ưu Đãi</h3>
            </Grid>

            <Grid item xs={12} xs={6}  md={3}>
              <WhatsAppIcon className={styles.icon} />
              <h3 style={{ textAlign: "center", color: "#e79413" }}>Hỗ Trợ 24/7</h3>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </>
  );
}

export default Service;
