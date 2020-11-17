import DataTable from "@admin/Components/DataTable/DataTable";
import api from "services/axios";

const dataTableConfigs = {
  name: "category",
  routerRules: "/admin/category#slug",
  columnConfigs: [
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    { id: "slug", numeric: true, disablePadding: false, label: "Slug" },
    { id: "description", numeric: true, disablePadding: false, label: "Description" },
  ],
};

function Category() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/category/`);
        if (data) {
          setCategories(data.categories);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <DataTable
      data={categories}
      orderByDefault={{ order: "desc", orderBy: "slug" }}
      dataTableConfigs={dataTableConfigs}
      checkbox
    />
  );
}

export default Category;
