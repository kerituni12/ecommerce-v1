import { Container, Grid, Toolbar, Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { getProductList } from "./product.slice";

function ProductList({ products }) {
  return (
    <Grid container spacing={1}>
      {renderProductList(products)}
    </Grid>
  );
}

function renderProductList(products) {
  const result = !!products ? (
    products.map((item, index) => {
      return (
        <Grid key={index} item xs={12} sm={4} lg={2}>
          <ProductCard item={item} />
        </Grid>
      );
    })
  ) : (
    <>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <ProductCardSkeleton />
      </Grid>
    </>
  );
  return result;
}
export default ProductList;
