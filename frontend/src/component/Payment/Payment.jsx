import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../App";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = () => {
  
  const stripePromise = loadStripe(
    "pk_test_51O2t3FSH6OcOxuhnnJDGpo3CDg2zuqJm5RC21EdPFwcy2ZJdlSfANKaCCSYJYZ4hSRMr6HnWU3H7iLznjHiIaAQS00JxvDUZvk"
  );

  // const options = {
  //   clientSecret:
  //     "pi_3OzIY7SH6OcOxuhn1JWHGSe4_secret_SPwACDx6XXvHLAuCjktCvqTZ4",
  // };
  const { userInfo } = useSelector((state) => state.user);
  const { amount } = useParams();

  // const [data, setData] = useState({
  //   customer_id: userInfo.customer_id,
  //   amount: amount,
  // });
  // let client_secret = null;
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     auth_token: localStorage.getItem("userToken"),
  //   },
  // };
  // axios
  //   .post(`${BASE_URL}/payment/process`, { amount }, config)
  //   .then((response) => {
  //     client_secret = response.data.client_secret;
  //   })
  //   .catch((error) => {
  //     toast.error(error, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   });
  // try {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       auth_token: localStorage.getItem("userToken"),
  //     },
  //   };
  //   const resp =  axios.post(
  //     `${BASE_URL}/payment/process`,
  //     { amount },
  //     config
  //   );
  //    client_secret = resp.data.client_secret
  // } catch (error) {
  //   toast.error(error, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }

  // const options = {
  //   clientSecret: client_secret,
  // };
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
