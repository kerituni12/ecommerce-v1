import Header from "@shop/Components/Header/Header";
export default function ShopLayout({ children }) {
  return (
    <>
      <Header />
      <div style={{ marginTop: 140 }}>{children}</div>
    </>
  );
}
