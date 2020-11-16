import ProductList from "@shop/Product/ProductList";
import api from "services/axios";
import { Container, Toolbar } from "@material-ui/core";

function ProductHome(props) {
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/product/`);
        if (data) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Toolbar variant="dense" style={{ backgroundColor: "#FFF", marginTop: 25 }}>
        <h4 style={{ color: "rgb(0, 172, 193)" }}> GỢI Ý CHO BẠN </h4>
      </Toolbar>
      <div style={{ backgroundColor: "rgb(0, 172, 193)", width: 200, height: 2 }}></div>
      <ProductList products={products} />
    </Container>
  );
}

export default ProductHome;
