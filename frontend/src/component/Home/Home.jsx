import React, { useEffect, useState } from "react";
import "./Home.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SLider from "../Helper/SLider";
import PropCard from "../Helper/Card";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlatImg from "../Images/flat_img.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Helper/Loader";
import { fetchRecomendendProperty } from "../../Action/propertyAction";
import {
  fetchCityByCountry,
  fetchCityByStateCountry,
} from "../../Slice/citySlice";
import "./Home.css";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/userSlice";
import { userLocation } from "../../Action/userAction";



const getRandomCities = (cities, numCities) => {
  const shuffledCities = [...cities]; 

  
  for (let i = shuffledCities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCities[i], shuffledCities[j]] = [
      shuffledCities[j],
      shuffledCities[i],
    ];
  }

  return shuffledCities.slice(0, numCities); 
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, location } = useSelector(
    (state) => state.user
  );
  const { recomdend, loading } = useSelector((state) => state.properties);
  const { cities, state_cities } = useSelector((state) => state.cities);
  const [keyword, setKeyword] = useState();
  let randomCities;
  if (userInfo) {
    randomCities = getRandomCities(state_cities, 50);
  }

  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/properties/${keyword}`);
    } else {
      navigate("/properties");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if ((result.state === "granted") || (result.state === "prompt")) {
            navigator.geolocation.getCurrentPosition(function (position) {
              dispatch(
                userLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
              );
            });
          }else if (result.state === "denied") {
            toast.error('Please allow Location Access!', {
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
        });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    dispatch(fetchCityByCountry());
  }, [dispatch, navigator,toast]);

  useEffect(() => {
    if (location) {
      dispatch(fetchRecomendendProperty(location.city));
      dispatch(fetchCityByStateCountry(location.state_code));

    } else {
      console.log("Location is not available yet.");
    }
  }, [dispatch, location]);
  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="home_page_banner"></div>
          <div className="custom-shape-divider-bottom-1696315792">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="container search-box">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="form">
                  <i className="fa fa-search"></i>
                  <form onSubmit={submitSearch}>
                    <input
                      type="text"
                      className="form-control form-input"
                      placeholder="Search anything..."
                      list="browsers"
                      onChange={(e) => setKeyword(e.target.value)}
                      value={keyword}
                    />
                    <datalist id="browsers">
                      {cities &&
                        cities.map((data) => {
                          return <option value={data.name} id={data.id} />;
                        })}
                    </datalist>
                  </form>
                  <span className="left-pan">
                    <KeyboardVoiceIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <main className="main">
            <div className="cities-card my-5">
              <h3 className="main-heading">
                Choose By <span className=" title-heading"> Cities</span>{" "}
              </h3>
              <SLider cities={randomCities} />
            </div>
            <div className="properties my-5">
              <h3 className="main-heading my-3">
                Recommended By <span className=" title-heading"> Cities</span>{" "}
              </h3>
              <div className="row" data-aos="fade-down">
                {recomdend &&
                  recomdend.map((current) => {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 col-6 gy-5"
                        key={current.state_codeid}
                      >
                        <PropCard data={current} />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bhk" data-aos="fade-down">
              <div className="row m-auto ">
                <div className="col-lg-8 d-flex flex-column justify-content-center">
                  <h1 className="main-heading my-3 grey">
                    Choose By <span className=" title-heading">BHK</span>
                  </h1>
                  <p className="text-secondary text-content">
                    {" "}
                    orem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.{" "}
                  </p>
                </div>
                <div className="col-lg-4 bhk-slider">
                  <Swiper
                    grabCursor={true}
                    effect={"creative"}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    creativeEffect={{
                      prev: {
                        shadow: true,
                        translate: ["-125%", 0, -800],
                        rotate: [0, 0, -90],
                      },
                      next: {
                        shadow: true,
                        translate: ["125%", 0, -800],
                        rotate: [0, 0, 90],
                      },
                    }}
                    modules={[EffectCreative, Autoplay]}
                    className="mySwiper5"
                  >
                    <SwiperSlide>
                      <Link className="text-decoration-none" to={'/properties?prop_type=1BHK'}>
                        <div
                          className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded"
                          style={{ width: "25rem" }}
                        >
                          <img
                            src={FlatImg}
                            className="card-img-top bg-body-tertiary"
                            alt="..."
                            width="100"
                            height="150"
                          />
                          <div className="card-body">
                            <p className="card-text">BHK</p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Link className="text-decoration-none" to={'/properties?prop_type=2BHK'}>
                        <div
                          className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded"
                          style={{ width: "25rem" }}
                        >
                          <img
                            src={FlatImg}
                            className="card-img-top bg-body-tertiary"
                            alt="..."
                            width="100"
                            height="150"
                          />
                          <div className="card-body">
                            <p className="card-text">2BHK</p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Link className="text-decoration-none" to={'/properties?prop_type=3BHK'}>
                        <div
                          className="card border-0 shadow p-3 mb-5 bg-body-tertiary rounded"
                          style={{ width: "25rem" }}
                        >
                          <img
                            src={FlatImg}
                            className="card-img-top bg-body-tertiary"
                            alt="..."
                            width="100"
                            height="150"
                          />
                          <div className="card-body">
                            <p className="card-text">3BHK</p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
