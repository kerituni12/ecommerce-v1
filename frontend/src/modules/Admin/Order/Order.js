import DataTable from "@admin/Components/DataTable/DataTable";
import api from "services/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const dataTableConfigs = {
  name: "order",
  columnConfigs: [
    {
      id: "_id",
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
        const { data } = await api.get(`/api/order`);
        if (data) {
          const _data = data.orders.map((order) => ({
            _id: order._id,
            total: order.totalPrice,
            delivered: order.isDelivered + "",
            paid: order.isPaid + "",
            method: order.payment.paymentMethod,
            time: new Date(order.updatedAt).toISOString().slice(0, 10),
          }));
          setOrders(_data);
        }
      } catch (error) {
        toast(error.response.data.message);
      }
    }
    fetchData();
  }, []);
  return (
    <DataTable data={orders} orderByDefault={{ order: "desc", orderBy: "slug" }} dataTableConfigs={dataTableConfigs} />
  );
}

export default Orders;
