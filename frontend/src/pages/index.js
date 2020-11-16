import Header from "modules/Shop/Components/Header/Header";
import Carousel from "@shop/Components/Carousel/Carousel";
import ProductList from "@shop/Product/ProductList";
import ProductDetail from "@shop/Product/ProductDetail";
import Checkout from "@shop/Checkout/Checkout";
import ProductHome from "@shop/Product/ProductHome";
import Service from "@shop/Components/Service/Service";
const App = (props) => {
  return (
    <>
      <Carousel />
      <Service />
      <ProductHome />
      {/* <ProductDetail /> */}
      {/* <Checkout /> */}
    </>
  );
};
export default React.memo(App);
