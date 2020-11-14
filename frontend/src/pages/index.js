import Header from "modules/Shop/Components/Header/Header";
import Carousel from "@shop/Components/Carousel/Carousel";
import ProductList from "@shop/Product/ProductsList";
import ProductDetail from "@shop/Product/ProductDetail";
import Checkout from "@shop/Checkout/Checkout";
import { Container } from "@material-ui/core";
import Service from "@shop/Components/Service/Service";
const App = (props) => {
  return (
    <>
      <Carousel />
      <Service />
      <ProductList />
      {/* <ProductDetail /> */}
      {/* <Checkout /> */}
    </>
  );
};
export default React.memo(App);
