import React, {useRef, useState } from "react";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BASE_URL } from "../../App";
import { toast } from "react-toastify";
import "./CheckoutForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import { createBooking } from "../../Action/bookingAction";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: userInfo && userInfo.full_name,
    email: userInfo && userInfo.email,
  });
  const paybtn = useRef(null);

  const submitHandler = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    paybtn.current.disabled = true;
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      };
      const { data } = await axios.post(
        `${BASE_URL}payment/process`,
        { amount: bookingInfo.totalPrice },
        config
      );
      const client_secret = data.data.client_secret;
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
     

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        paybtn.current.disabled = false;
        setIsLoading(false);
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const booking = {
            property_id: id,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status

            },
              propertyPrice: bookingInfo.amount,
              BookingCharges: bookingInfo.charge,
              totalPrice: bookingInfo.totalPrice,
              status: result.paymentIntent.status,
            }
          dispatch(createBooking(booking));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
      setIsLoading(false);
    } catch (error) {
      paybtn.current.disabled = false;
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <form
        className="paymentForm m-auto"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <Typography>Card Info</Typography>
        <div>
          <CreditCardIcon />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <EventIcon />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <VpnKeyIcon />
          <CardCvcElement className="paymentInput" />
        </div>
        <button type="submit" ref={paybtn} className="paymentFormbtn">
          {`Pay - ₹${bookingInfo && bookingInfo.totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
