import DataTable from "@admin/Components/DataTable/DataTable";

const cellConfigs = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  { id: "slug", numeric: true, disablePadding: false, label: "Slug" },
  { id: "description", numeric: true, disablePadding: false, label: "Description" },
];

function Category() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <DataTable data={categories} orderByDefault={{order:"desc", orderBy: "slug"}} cellConfigs={cellConfigs} checkbox />
  );
}

export default Category;
