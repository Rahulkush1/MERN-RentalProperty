import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./PaymentSuccess.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const PaymentSuccess = () => {
  return (
    <div class="success-container">
    <div class="success-container bookingSuccess">
      <div class="success-icon">
        <span class="icon">&#10003;</span>
      </div>
      <h2 class="success-message">Payment Successful!</h2>
      <Link to="/users/bookings">View Bookings</Link>
    </div>
  </div>
  );
};

export default PaymentSuccess;
