import React, { useEffect, useState } from "react";
import Formatprice from "../Helper/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PropertyDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WifiIcon from "./../Images/wifi.png";
import GymIcon from "./../Images/fitness.png";
import GardenIcon from "./../Images/garden.png";
import Parking from "./../Images/parking-lot.png";
import SwimmingPool from "./../Images/swimming-pool.png";
import FoodServiceIcon from "./../Images/catering.png";
import Breadcrumb from "../Helper/Breadcrumb";
import Loader from "../Helper/Loader";
import {
  CreatePropertyReview,
  fetchPropertyDetails,
} from "../../Action/propertyAction";
import ReviewCard from "../Helper/ReviewCard";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AppointmentForm from "../Helper/AppointmentForm";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/appointmentSlice";
import { getAppointment } from "../../Action/appointmentAction";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { getBooking } from "../../Action/bookingAction";
import NoImage from "../Images/NoImage.png";

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { appointment, success, error } = useSelector(
    (state) => state.appointment
  );
  const { property, loading } = useSelector((state) => state.properties);
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const { booking } = useSelector((state) => state.booking);

  const [reviews, setReviews] = useState({
    property_id: id,
  });
  const HandleReview = (e) => {
    setReviews({ ...reviews, [e.target.name]: e.target.value });
  };
  const { rating, comment, property_id } = reviews;
  const SubmitReview = async (e) => {
    e.preventDefault();
    if (userInfo && isAuthenticated) {
      dispatch(CreatePropertyReview({ rating, comment, property_id }));
    } else {
      toast.error("Please Login to review property", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    dispatch(fetchPropertyDetails(id));
    setReviews({ property_id: id });
  };

  const CheckUserLogin = (e) => {
    console.log(e.target.dataset);
    if (!isAuthenticated || !userInfo) {
      e.target.dataset.bsTarget = "";
      e.target.dataset.bsToggle = "";
      e.target.dataset.bsWhatever = "";

      toast.error("Please Login to schedule visit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(fetchPropertyDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      toast.success("Schedule Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (isAuthenticated && error && error != "Not Found") {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    dispatch(clearErrors());
  }, [dispatch, toast, success, error, isAuthenticated]);

  useEffect(() => {
    dispatch(getAppointment(id));
    dispatch(getBooking(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-5">
          <div className="grey my-3">
            <Breadcrumb />
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-8">
                  <div className="property-img-slider">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper">
                      {property &&
                        property.images &&
                        property.images.map((data, index) => {
                          return (
                            <>
                              <SwiperSlide key={index}>
                                <img
                                  src={data?.url}
                                  alt=""
                                  className=" img-fluid property_img"
                                  style={{ width: "100%" }}
                                />
                              </SwiperSlide>
                            </>
                          );
                        })}
                    </Swiper>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className=" property-images">
                    <img
                      src={
                        property && property.images && property.images[0]?.url
                      }
                      alt=""
                      className="img-fluid mx-2  my-2 property_img"
                    />
                    <img
                      src={
                        property && property.images && property.images[1]?.url
                      }
                      alt=""
                      className="img-fluid mx-2 my-2  property_img"
                    />
                  </div>
                </div>
                <h2 className="price text-dark my-2" data-aos="fade-right">
                  {" "}
                  <Formatprice price={property.price} />{" "}
                </h2>
                <div className="d-flex justify-content-between">
                  <p className="grey">
                    <LocationOnIcon className="pin_point" />{" "}
                    {property && property.address && property.address.street}{" "}
                    {property && property.address && property.address.city}{" "}
                    {property && property.address && property.address.state},{" "}
                    {property && property.address && property.address.zip}
                  </p>
                  {property && property.status === "SOLD" ? (
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                      variant="contained"
                      className="fw-bold text-center  floating"
                      disabled={true}>
                      <LocalPhoneIcon className="mx-2 " /> Sold
                    </Button>
                  ) : appointment &&
                    appointment.attributes &&
                    appointment.attributes.status !== "Rejected" ? (
                    appointment.attributes &&
                    appointment.attributes.status === "Pending" ? (
                      <Button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        variant="contained"
                        className="fw-bold text-center  floating"
                        disabled={true}>
                        <LocalPhoneIcon className="mx-2 " /> Meeting Scheduled
                      </Button>
                    ) : (
                      <Button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        variant="contained"
                        className="fw-bold text-center  floating">
                        <LocalPhoneIcon className="mx-2 " /> Reserve Your Space
                        Now
                      </Button>
                    )
                  ) : (
                    <Button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                      variant="contained"
                      className="fw-bold text-center  floating">
                      <LocalPhoneIcon className="mx-2 " /> Schedule Meeting
                    </Button>
                  )}
                </div>
                <div
                  className="amenities  d-flex justify-content-around w-50 "
                  style={{ color: "var(--grey)" }}
                  data-aos="fade-right">
                  {property &&
                    property.amenities &&
                    property.amenities.map((data, index) => {
                      return (
                        <>
                          {index < 3 ? (
                            <p
                              key={index}
                              className="d-flex align-items-center">
                              {data.title.toLowerCase() === `wifi` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `gym facility` ? (
                                <img
                                  src={GymIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `garden area` ? (
                                <img
                                  src={GardenIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `food facility` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() ===
                                `parking area` ? (
                                <img
                                  src={Parking}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : data.title.toLowerCase() === `ro water` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              ) : (
                                <img
                                  src={SwimmingPool}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                />
                              )}
                              <span className="mx-2">{data.title}</span>
                            </p>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                </div>
                <div
                  className="discription text-dark text-break my-4"
                  data-aos="fade-right">
                  <h4 className="grey">Property Description</h4>
                  <p className="property-details-note">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci distinctio fuga veniam sed, sunt enim? Sit
                    obcaecati necessitatibus praesentium nihil vero itaque
                    exercitationem reiciendis delectus.
                  </p>
                </div>
                <div className="posted_by  grey my-3">
                  <div className="">
                    <h4>Posted By</h4>
                    <p className="posted">
                      {property && property.user?.role?.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="text-dark text-end">
                  <h3>
                    <Formatprice price={property.price} />
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              {property && property.status === "sold" ? (
                <div
                  className="card border-primary mb-3 booking-box"
                  style={{ maxWidth: "28rem" }}
                  data-aos="fade-left">
                  <div className="card-header">Book </div>
                  <div className="card-body text-primary">
                    <h5 className="card-title">Reserve Your Space </h5>
                    <p className="card-text grey">
                      Are you ready to find your ideal space? Our range of PGs,
                      rooms, and flats await, offering comfort and convenience
                      tailored to your needs.
                      <br />
                      <br />
                      Why wait to secure your spot when you can do it now?. Book
                      now and unlock the perfect living arrangement for you.
                    </p>

                    <Button variant="outlined" className="" disabled={true}>
                      {" "}
                      <BookOnlineIcon className="mx-2" /> Sold
                    </Button>
                  </div>
                </div>
              ) : appointment &&
                appointment.attributes &&
                appointment.attributes.status !== "Rejected" ? (
                appointment.attributes &&
                appointment.attributes.status === "Pending" ? (
                  <div
                    className="card border-primary mb-3"
                    style={{ maxWidth: "28rem" }}
                    data-aos="fade-left">
                    <div className="card-header">Note</div>
                    <div className="card-body text-primary">
                      <h5 className="card-title">Schedule Visit Appointment</h5>
                      <p className="card-text grey property-details-note">
                        Are you eager to explore our range of properties, from
                        cozy rooms to spacious PGs?
                        <br />
                        To ensure that your visit is seamless and personalized,
                        we highly recommend scheduling an appointment in
                        advance. By doing so, you'll receive dedicated
                        assistance from our team, allowing us to tailor your
                        viewing experience to your specific requirements.
                        <br />
                        Simply fill out the form below with your preferred date
                        and time, and our team will reach out to confirm your
                        appointment.
                        <br />
                        Don't miss out on the opportunity to find your ideal
                        property. Schedule your appointment today and let us
                        help you discover your perfect home!
                      </p>
                      <Button
                        variant="outlined"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        className="fw-bold text-center  "
                        disabled={true}>
                        <LocalPhoneIcon className="mx-2" /> Scheduled
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="card border-primary mb-3 booking-box"
                    style={{ maxWidth: "28rem" }}
                    data-aos="fade-left">
                    <div className="card-header">Book </div>
                    <div className="card-body text-primary">
                      <h5 className="card-title">Reserve Your Space </h5>
                      <p className="card-text grey property-details-note">
                        Are you ready to find your ideal space? Our range of
                        PGs, rooms, and flats await, offering comfort and
                        convenience tailored to your needs.
                        <br />
                        <br />
                        Why wait to secure your spot when you can do it now?.
                        Book now and unlock the perfect living arrangement for
                        you.
                      </p>
                      <Link
                        to={`confirm/booking/${property.price}`}
                        className="text-decoration-none">
                        <Button variant="outlined" className="">
                          {" "}
                          <BookOnlineIcon className="mx-2" /> Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div
                  className="card border-primary mb-3"
                  style={{ maxWidth: "28rem" }}
                  data-aos="fade-left">
                  <div className="card-header">Note</div>
                  <div className="card-body text-primary">
                    <h5 className="card-title">Schedule Visit Appointment</h5>
                    <p className="card-text grey property-details-note ">
                      Are you eager to explore our range of properties, from
                      cozy rooms to spacious PGs?
                      <br />
                      To ensure that your visit is seamless and personalized, we
                      highly recommend scheduling an appointment in advance. By
                      doing so, you'll receive dedicated assistance from our
                      team, allowing us to tailor your viewing experience to
                      your specific requirements.
                      <br />
                      Simply fill out the form below with your preferred date
                      and time, and our team will reach out to confirm your
                      appointment.
                      <br />
                      Don't miss out on the opportunity to find your ideal
                      property. Schedule your appointment today and let us help
                      you discover your perfect home!
                    </p>
                    <Button
                      variant="outlined"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                      className="fw-bold text-center  ">
                      <LocalPhoneIcon className="mx-2" /> Schedule Now !
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <h3 className="my-4" style={{ color: "var(--grey)" }}>
                  Amenities
                </h3>
                <div className="row p-4">
                  {property &&
                    property.amenities &&
                    property.amenities.map((data, index) => {
                      return (
                        <>
                          <div className="col-lg-6 text-secondary">
                            <p
                              key={index}
                              className="d-flex  align-items-center">
                              {data.title.toLowerCase() === `wifi` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : data.title.toLowerCase() ===
                                `gym facility` ? (
                                <img
                                  src={GymIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : data.title.toLowerCase() === `garden area` ? (
                                <img
                                  src={GardenIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : data.title.toLowerCase() ===
                                `food facility` ? (
                                <img
                                  src={FoodServiceIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : data.title.toLowerCase() ===
                                `parking area` ? (
                                <img
                                  src={Parking}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : data.title.toLowerCase() === `ro water` ? (
                                <img
                                  src={WifiIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              ) : (
                                <img
                                  src={SwimmingPool}
                                  className="img-fluid"
                                  alt=""
                                  width={40}
                                  height={10}
                                  data-aos="flip-up"
                                />
                              )}
                              <span className="mx-2">{data.title}</span>
                            </p>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="grey text-center">Review </h4>
            <div>
              <p className="grey">Create Review</p>
              <div class="card  mb-3  review-form">
                <div class="card-body">
                  <form onSubmit={SubmitReview}>
                    <div className="mb-3">
                      <p className="grey">Give Rating</p>
                      <Stack spacing={1}>
                        <Rating
                          name="rating"
                          value={reviews.rating}
                          defaultValue={0}
                          precision={0.5}
                          onChange={HandleReview}
                        />
                      </Stack>
                    </div>
                    <div className="mb-3">
                      <textarea
                        rows="5"
                        name="comment"
                        value={reviews.comment}
                        placeholder="Give Review.."
                        className="form-control p-3"
                        onChange={HandleReview}
                      />
                    </div>
                    <input
                      type="submit"
                      value="submit"
                      className="btn btn-primary"
                    />
                  </form>
                </div>
              </div>
            </div>

            {property &&
              property.reviews &&
              property.reviews.map((review) => {
                return (
                  <div key={review.id}>
                    <ReviewCard review={review} />
                  </div>
                );
              })}
          </div>
          {userInfo && "dfghjkjdsghjuiytrdfghjuytrfd"}
          {userInfo && <AppointmentForm data={userInfo} id={id} />}
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
