import { useRouter } from "next/router";
import ProductList from "@shop/Product/ProductList";
import api from "services/axios";
import { Container } from "@material-ui/core";

function Category(props) {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    if (!!category) {
      async function fetchData() {
        try {
          const { data } = await api.get(`/api/product/get-product-of-category/${category}`);          
          if (data) {
            setProducts(data.products);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [category]);
  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
}

export default Category;
