import { Container, Grid, Toolbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getProductList } from "./product.slice";

function ProductList(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);
  React.useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <Container>
      <Toolbar variant="dense" style={{ backgroundColor: "#FFF", marginTop: 25 }}>
        <h4 style={{ color: "rgb(0, 172, 193)" }}> GỢI Ý CHO BẠN </h4>
      </Toolbar>
      <div style={{ backgroundColor: "rgb(0, 172, 193)", width: 200, height: 2 }}></div>
      <Grid container spacing={1}>
        {renderProductList(products)}
      </Grid>
    </Container>
  );
}

function renderProductList(products) {
  const result = !!products
    ? products.map((item, index) => {
        return (
          <Grid key={index} item xs={12} sm={4} lg={2}>
            <ProductCard item={item}/>
          </Grid>
        );
      })
    : null;
  return result;
}
export default ProductList;
