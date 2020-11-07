import Header from "@shop/Components/Header/Header";
import Footer from "@shop/Components/Footer/Footer";

export default function ShopLayout({ children }) {
  return (
    <>
      <Header />
      <div style={{ marginTop: 140 }}>{children}</div>
      <Footer />
    </>
  );
}
