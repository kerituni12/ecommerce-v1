import DataTable from "@admin/Components/DataTable/DataTable";
import api from "services/axios";

const dataTableConfigs = {
  name: "product",
  routerRules: "/admin/product#slug",
  columnConfigs: [
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Product",
    },
    { id: "slug", numeric: true, disablePadding: false, label: "Slug" },
    { id: "description", numeric: true, disablePadding: false, label: "Description" },
  ],
};

function Products() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/product/`);
        if (data) {
          const _products = data.products.map((product) => {
            return {
              ...product,
              description: product.description.split(" ").slice(0, 18).join(" ") + "...",
            };
          });
          setProducts(_products);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <DataTable
      data={products}
      orderByDefault={{ order: "desc", orderBy: "slug" }}
      dataTableConfigs={dataTableConfigs}
      checkbox
    />
  );
}

export default Products;
