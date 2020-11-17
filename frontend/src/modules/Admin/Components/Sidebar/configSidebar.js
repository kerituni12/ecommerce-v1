import IconDashboard from "@material-ui/icons/Dashboard";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import IconPeople from "@material-ui/icons/People";
import IconBarChart from "@material-ui/icons/BarChart";
import IconLibraryBooks from "@material-ui/icons/LibraryBooks";

const drawConfigs = {
  drawerWidth: 200,
  drawerClose: 56,
};

const appMenuItems = [
  {
    name: "Dashboard",
    link: "/admin",
    Icon: IconDashboard,
  },
  {
    name: "Order",
    link: "/admin/order",
    Icon: IconShoppingCart,
  },
  {
    name: "Customers",
    Icon: IconPeople,
  },
  {
    name: "Product",
    Icon: IconBarChart,
    items: [
      {
        name: "Create Poduct",
        link: "/admin/product/create",
      },
      {
        name: "List",
        link: "/admin/product",
      },
    ],
  },
  {
    name: "Category",
    Icon: IconBarChart,
    items: [
      {
        name: "Create",
        link: "/admin/category/create",
      },
      {
        name: "List",
        link: "/admin/category",
      },     
    ],
  },
  {
    name: "MailChimp",
    Icon: IconBarChart,
    items: [
      {
        name: "List",
        link: "/admin/mailchimp",
      },
    ],
  },
  {
    name: "Nested Pages",
    Icon: IconLibraryBooks,
    items: [
      {
        name: "Level 2",
      },
      {
        name: "Level 2",
        items: [
          {
            name: "Level 3",
          },
          {
            name: "Level 3",
          },
        ],
      },
    ],
  },
];

export { appMenuItems, drawConfigs };
