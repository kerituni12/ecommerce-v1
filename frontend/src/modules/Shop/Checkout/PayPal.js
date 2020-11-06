import { useDispatch, useSelector } from "react-redux";
import { getPaymentSumary } from "@shop/Cart/cart.slice";
import { addUserInfo } from "./checkout.slice";
import api from "services/axios";

async function createOrder(order) {
  try {
    const { data } = await api.post(`/api/order`, order);
    if (data) {
      console.log(data);
      return data.order;
    }
  } catch (err) {
    console.log(err.response);
  }
}

export default function Paypal({ order }) {
  const paypal = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: 10,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const result = await actions.order.capture();
          console.log(result);
          const { description, amount, payee } = result.purchase_units[0];

          if (result.status === "COMPLETE") order.isPaid = true;

          order.payment.paymentDetail = {
            id: result.id,
            payer: result.payer,
            purchase_units: { description, amount, payee },
          };

          const resultCreateOrder = await createOrder(order);
          console.log(resultCreateOrder);
          if (resultCreateOrder) dispatch(addUserInfo(resultCreateOrder));
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
      <button onClick={() => createOrder(order)}>create order</button>
    </div>
  );
}
