import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { addUserInfo } from "./checkout.slice";
import api from "services/axios";

async function createOrder(order) {
  try {
    const { data } = await api.post(`/api/order`, order);
    if (data) {
      return data.order;
    }
  } catch (err) {
    console.log(err);
  }
}

const usdExchangeRate = 23176;
const vndToUsd = (money) => Math.round((money / usdExchangeRate) * 100) / 100;

export default function Paypal({ order }) {
  const paypal = React.useRef();
  const dispatch = useDispatch();

  let totalUSDPrice = 0;
  const orderItems = order.orderItems.map((item) => {
    totalUSDPrice += vndToUsd(item.price) * item.quantity;
    return {
      unit_amount: {
        currency_code: "USD",
        value: vndToUsd(item.price),
      },
      quantity: item.quantity,
      name: item.title,
    };
  });

  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Thanh toán hóa đơn",
                amount: {
                  value: totalUSDPrice,
                  currency_code: "USD",
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: totalUSDPrice,
                    },
                  },
                },
                items: orderItems,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const result = await actions.order.capture();
          const { description, amount, payee } = result.purchase_units[0];

          if (result.status === "COMPLETED") order.isPaid = true;

          order.payment.paymentDetail = {
            id: result.id,
            payer: result.payer,
            purchase_units: { description, amount, payee },
          };

          const resultCreateOrder = await createOrder(order);
          console.log(resultCreateOrder);
          if (resultCreateOrder) Router.push(`/order/${resultCreateOrder._id}`);
        },
        onError: (err) => {
          throw new Error(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

// {
//   "isPaid": false,
//   "isDelivered": false,
//   "_id": "5fa797f2b2c70b28aadeaa98",
//   "orderItems": [
//   {
//     "_id": "5f97b384299d6e5edf48e183",
//     "title": "NIKE BLAZER MID WHITE",
//     "price": 200,
//     "image": "https://product.hstatic.net/1000383440/product/72d51693-fcdb-475e-977c-5bf653fc7555_719a70d89e744c6f97257c33b10bb3a2_grande.jpeg",
//     "inventory": 1000,
//     "quantity": 3,
//     "checked": true
//   }
// ],
//   "user": {
//     "name": "Nguyễn Hiếu",
//     "email": "test@gmail.com",
//     "phone": "1634538547"
//   },
//   "shipping": {
//     "address": "38 Dương Đức Hiền",
//     "city": "Quận Tân Phú",
//     "ward": "123"
//   },
//   "itemsPrice": 0,
//   "shippingPrice": 0,
//   "totalPrice": 0,
//   "payment": {
//     "paymentMethod": "paypal",
//     "paymentDetail": {
//       "id": "9RA8571853768790J",
//       "payer": {
//         "email_address": "sb-ygxi03330092@personal.example.com",
//         "payer_id": "PFGBKRQWWFZ6G",
//         "address": {
//           "country_code": "US"
//         },
//         "name": {
//           "given_name": "John",
//           "surname": "Doe"
//         }
//       },
//       "purchase_units": {
//         "description": "Cool looking table",
//         "amount": {
//           "value": "10.00",
//           "currency_code": "USD"
//         },
//         "payee": {
//           "email_address": "sb-pizul3332927@business.example.com",
//           "merchant_id": "HGUK4WGEFD6SJ"
//         }
//       }
//     }
//   },
//   "createdAt": "2020-11-08T07:02:10.781Z",
//   "updatedAt": "2020-11-08T07:02:10.781Z",
//   "__v": 0
// }
