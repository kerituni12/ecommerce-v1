import DataTable from "@admin/Components/DataTable/DataTable";
import api from "services/axios";

const dataTableConfigs = {
  name: "mailchimp",
  columnConfigs: [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    {
      id: "email_address",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    { id: "status", numeric: true, disablePadding: false, label: "Status" },
  ],
};

function Products() {
  const [members, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/mailchimp`);
        if (data) {
          const temp = data.members.map(({ email_address, status, merge_fields }) => ({
            email_address,
            status,
            name: merge_fields.NAME,
          }));

          console.log(temp);
          setProducts(temp);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <DataTable data={members} orderByDefault={{ order: "desc", orderBy: "name" }} dataTableConfigs={dataTableConfigs} />
  );
}

export default Products;
