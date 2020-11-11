import DataTable from "@admin/Components/DataTable/DataTable";

const cellConfigs = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "email_address",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
];

function Products() {
  const [members, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/mailchimp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ members }) => {
        const temp = members.map(({ email_address, status, merge_fields }) => ({
          email_address,
          status,
          name: merge_fields.NAME,
        }));

        console.log(temp);
        setProducts(temp);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return <DataTable data={members} orderByDefault={{ order: "desc", orderBy: "name" }} cellConfigs={cellConfigs} />;
}

export default Products;
