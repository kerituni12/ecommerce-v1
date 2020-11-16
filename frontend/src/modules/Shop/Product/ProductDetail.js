import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import { Container, TextField } from "@material-ui/core";
import convertPrice from "helpers/convertPriceVND";
import Button from "@material-ui/core/Button";
import { updateCart } from "@shop/Cart/cart.slice";
import { DOMAIN } from "configs/constants";

const styleImage = {
  border: "2px solid rgba(0,0,0,.05)",
  height: 320,
};

const stylePrice = {
  color: "rgb(0, 172, 193)",
};

function ProductDetail({ product, params }) {
  const dispatch = useDispatch();
  const [quantity, setQuality] = useState(1);
  const handleChange = (event) => {
    setQuality(parseInt(event.target.value));
  };
  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={product.title}></meta>
        <link rel="canonical" href={`${DOMAIN}/product/${params.product}`} />
        <meta property="og:title" content={`${product.title}| Shop Sale`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="online shop" />
        <meta property="og:url" content={`${DOMAIN}/product/${params.product}`} />
        <meta property="og:site_name" content="Shop sale" />

        <meta property="og:image" content={`${product.image}`} />
        <meta property="og:image:secure_url" ccontent={`${product.image}`} />
        <meta property="og:image:type" content="image/jpg" />
        {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} xs={10} sm={10} md={6} lg={5}>
            <img src={product.image} alt={product.title} style={styleImage} />
          </Grid>
          <Grid item xs={12} xs={10} sm={10} md={6} lg={6}>
            <h2>{product.title}</h2>

            <h1 style={stylePrice}>₫{convertPrice(product.price)}</h1>
            <h4>
              Vận Chuyển :
              <span style={{ marginLeft: 10 }}>
                <img
                  alt="free shipping"
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9d21899f3344277e34d40bfc08f60bc7.png"
                  style={{ height: 20 }}
                />
                Miễn Phí Vận Chuyển
              </span>
            </h4>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (quantity > 1) setQuality((quantity) => (quantity -= 1));
                }}
              >
                -
              </Button>
              <TextField size="small" variant="outlined" value={quantity} onChange={handleChange} />

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuality((quantity) => (quantity += 1));
                }}
              >
                +
              </Button>
            </div>

            <br />
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch(updateCart({ item: product, quantity }));
                }}
              >
                Thêm Vào Giỏ Hàng
              </Button>
              <Button variant="contained" color="primary" style={{ marginLeft: 10 }}>
                Mua Ngay
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} xs={10} sm={10} md={6} lg={5}>
            <div style={{ marginTop: 50 }}>
              <h4>CHI TIẾT SẢN PHẨM</h4>
              {product.description}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetail;
