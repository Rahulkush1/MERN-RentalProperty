import React, { useEffect } from "react";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import SignUp from "./component/Authentication/Signup";
import { createBrowserRouter } from "react-router-dom";

import Login from "./component/Authentication/Login";
import store from "./store";
import {
  clearErrors,
  removeCredentials,
  setCredentials,
  setUserError,
} from "./Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Property from "./component/Property/Property";
import PropertyDetails from "./component/Property/PropertyDetails";
import { useGetUserDetailsQuery } from "./services/auth/authService";
import Loader from "./component/Helper/Loader";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import UserDial from "./component/Helper/UserDial";
import { setProperty } from "./Slice/propertySlice";
import { useGetPropertiesQuery } from "./services/auth/propertyService";
import Appointment from "./component/Appointment/Appointment";
import "./App.css";
import Booking from "./component/Booking/Booking";
import UserProfile from "./component/User/UserProfile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./component/Payment/CheckoutForm";
import Payment from "./component/Payment/Payment";
import PaymentSuccess from "./component/Payment/PaymentSuccess";
import ConfirmBooking from "./component/Payment/ConfirmBooking";

import MiddlePage from "./component/Authentication/MiddlePage";
import Dashboard from "./component/SubAdmin/Dashboard/Dashboard";
import AdminProperty from "./component/SubAdmin/Property/Property"
import NewProperty from "./component/SubAdmin/Property/NewProperty";
import MultiStep from 'react-multistep'
import { loadUser } from "./Action/userAction";

export default function App() {
  AOS.init({
    offset: 200, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: "ease-in-out",
  });
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const { data, error, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 9000000,
  });
  const { data1, isloading } = useGetPropertiesQuery("properties", {
    pollingInterval: 9000000,
  });

  useEffect(() => {
    if (data1) {
      dispatch(setProperty(data1));
    }
    if (error) {
      dispatch(removeCredentials(error));
    }
    store.dispatch(loadUser())
  }, [dispatch, data, data1, error]);

  const stripePromise = loadStripe(
    "pk_test_51O2t3FSH6OcOxuhnnJDGpo3CDg2zuqJm5RC21EdPFwcy2ZJdlSfANKaCCSYJYZ4hSRMr6HnWU3H7iLznjHiIaAQS00JxvDUZvk"
  );

  const options = {
    clientSecret:
      "pi_3OzIY7SH6OcOxuhn1JWHGSe4_secret_SPwACDx6XXvHLAuCjktCvqTZ4",
  };
  return (
    <div className="app">
      <BrowserRouter>
        <div className="content">
          <Navbar />
          {isAuthenticated && <UserDial user={userInfo} options={options} />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/properties" element={<Property />} />
            <Route path="/properties/:keyword" element={<Property />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signuprole" element={<MiddlePage />} />

            <Route
              path="/users/appointments"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/bookings"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties/:id/confirm/booking/:amount"
              element={
                <ProtectedRoute>
                  <ConfirmBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties/:id/payment/process/"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/success"
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/properties"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminProperty />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/property"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProperty />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/property/edit/:property_id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProperty />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}
export const BASE_URL = "http://localhost:8000/api/v1/";
