import DataTable from "@admin/Components/DataTable/DataTable";
import { Grid, Container } from "@material-ui/core";
import api from "services/axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import UserCard from "./UserCard";

const cookies = new Cookies();

const dataTableConfigs = {
  name: "order",
  routerRules: "/order#id",
  columnConfigs: [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Order",
    },
    { id: "total", numeric: true, disablePadding: false, label: "Total" },
    { id: "method", numeric: true, disablePadding: false, label: "Paid Method" },
    { id: "paid", numeric: true, disablePadding: false, label: "Paid Status" },
    { id: "delivered", numeric: true, disablePadding: false, label: "Delivered" },
    { id: "time", numeric: true, disablePadding: false, label: "Time" },
  ],
};

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const payload = cookies.get("payloadClient");
        if (payload) {
          const user = JSON.parse(atob(payload));          
          const { data } = await api.get(`/api/order/user-order/${user.id}`);
          if (data) {
            const _data = data.orders.map((order) => ({
              id: order._id,
            total: order.totalPrice,
            delivered: order.isDelivered + "",
            paid: order.isPaid + "",
            method: order.payment.paymentMethod,
            time: new Date(order.updatedAt).toISOString().slice(0, 10),
            }));
            setOrders(_data);
          }
        }
      } catch (error) {
        toast(error.response.data.message);
      }
    }
    fetchData();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item md={4}>
          <UserCard />
        </Grid>
        <Grid item md={8}>
          <DataTable
            data={orders}
            orderByDefault={{ order: "desc", orderBy: "slug" }}
            dataTableConfigs={dataTableConfigs}
            checkbox
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Orders;
