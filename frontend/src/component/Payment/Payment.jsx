import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
    const { data } = await axios.get("/api/v1/payment/stripeapikey", config);
		setStripeApiKey(data.data.stripeApiKey);
  }
  
  const stripePromise = loadStripe(
    stripeApiKey && stripeApiKey
  );

  console.log(stripeApiKey)
  useEffect(() => {
    getStripeApiKey();
  }, [])
  
  return (
    <>
        <Elements stripe={stripePromise} >
              <CheckoutForm  />
        </Elements>
    </>
  );
};

export default Payment;

// const Payment = async () => {

//   const appearance = {
//     theme: "stripe",
//   };

//   const {userInfo} = useSelector(state => state.user)
//   const {amount} = useParams()
//   const [data, setData] = useState({
//     customer_id:  userInfo.customer_id,
//     amount: amount
//   })
//   let client_secret = null;

//   const createClientSecret = async (data) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           auth_token: localStorage.getItem("userToken"),
//         },
//       };
//       const resp = await axios.post(
//         `${BASE_URL}/payment/process`,
//         {data},
//         config
//       );

//       console.log(resp.data)
//       return resp.data.client_secret
//     } catch (error) {
//       toast.error(error, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//     createClientSecret(data)

//   console.log(client_secret)
//   const options = {
//     clientSecret: "pi_3Ozf6YSH6OcOxuhn1TqfWDfv_secret_LxtyEfncSjPCTf60sCxSWNI8a",
//     appearance: appearance,
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <ElementsConsumer>
//         {({ stripe, elements }) => (
//           <CheckoutForm stripe={stripe} elements={elements} />
//         )}
//       </ElementsConsumer>
//     </Elements>
//   );
// };

// export default Payment;
