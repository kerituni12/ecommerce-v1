import DataTable from "@admin/Components/DataTable/DataTable";

const cellConfigs = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  { id: "slug", numeric: true, disablePadding: false, label: "Slug" },
  { id: "description", numeric: true, disablePadding: false, label: "Description" },
];

function Products() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({products}) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <DataTable data={products} orderByDefault={{order:"desc", orderBy: "slug"}} cellConfigs={cellConfigs} checkbox />
  );
}

export default Products;
