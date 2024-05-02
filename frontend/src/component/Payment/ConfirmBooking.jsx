import React, { Fragment, useEffect } from "react";
// import CheckOutStep from "../Cart/CheckOutStep";
import { useDispatch, useSelector } from "react-redux";
// import MetaData from "../Layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import "./ConfirmBooking.css";
import { fetchPropertyDetails } from "../../Action/propertyAction";
import Formatprice from "../Helper/FormatPrice";

const ConfirmBooking = () => {
  // const { shippingInfo, cartItems } = useSelector((state) => state.cart);use
  const dispatch = useDispatch();
  const { amount, id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const { property, loading } = useSelector((state) => state.properties);
  const navigate = useNavigate();

  const tax = amount * 0.18;

  const totalPrice = Number(amount) + Number(tax);

  const proceedToPayment = () => {
    const data = {
      amount,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("bookingInfo", JSON.stringify(data));

    navigate(`/properties/${id}/payment/process`);
  };

  useEffect(() => {
    dispatch(fetchPropertyDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {/* <MetaData title="Confirm booking" /> */}
      {/* <CheckOutStep activeStep={1} /> */}
      <div className="confirmBookingPage grey">
        <div>
          <div className="confirmshippingArea">
            <Typography>Property Info</Typography>
            <Link to={`/properties/${id}`} className="text-decoration-none">
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Property Name:</p>
                  <span>{property && property.name}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {property &&
                      property.address &&
                      property.address.address_line}{" "}
                    {property && property.address && property.address.street},{" "}
                    {property && property.address && property.address.city},{" "}
                    {property && property.address && property.address.state}
                  </span>
                </div>
                <div className="row">
                  {property &&
                    property.avatar &&
                    property.avatar.map((url, index) => {
                      if (index < 4) {
                        return (
                          <div className="col-lg-3" key={index}>
                            <img
                              src={`http://localhost:5000/${url}`}
                              alt=""
                              className="img-fluid mb-3  property_img"
                              width={200}
                              height={200}
                            />
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </Link>
            <Typography>Your Details</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name</p>
                <span>{userInfo && userInfo.full_name}</span>
              </div>
              <div>
                <p>Email</p>
                <span>{userInfo && userInfo.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{userInfo && userInfo.phone}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Booking Price:</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Property Amount:</p>
                <span>
                  {property && <Formatprice price={property.price} />}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bookingSummary">
            <Typography className="grey">Booking Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{amount}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="bookingSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmBooking;
