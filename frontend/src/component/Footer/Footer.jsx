import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { CoPresentSharp } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

function Copyright() {
  return (
    <Typography variant="body2" color="rgba(241, 241, 241, 0.868)">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



export default function Footer() {
  return (

    <div className="mt-5">
      <footer
        className="text-center text-lg-start text-white"
        style={{backgroundColor: "#45526e"}}
      >
        <div className=" p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Rental Property
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              {/* <hr className="w-100 clearfix d-md-none" /> */}

              {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                <p>
                  <a className="text-white">MDBootstrap</a>
                </p>
                <p>
                  <a className="text-white">MDWordPress</a>
                </p>
                <p>
                  <a className="text-white">BrandFlow</a>
                </p>
                <p>
                  <a className="text-white">Bootstrap Angular</a>
                </p>
              </div> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <a className="text-white">Your Account</a>
                </p>
                <p>
                  <a className="text-white">Become an Affiliate</a>
                </p>
                <p>
                  <a className="text-white">Shipping Rates</a>
                </p>
                <p>
                  <a className="text-white">Help</a>
                </p>
              </div> */}

              {/* <hr className="w-100 clearfix d-md-none" /> */}

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p>
                  <i className="fas fa-home mr-3"></i>Indore, Madhya Pradesh, India
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> rentalproperty@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                Copyright
                <div className="p-3">
                  <Copyright />
                  <a className="text-white" href="https://mdbootstrap.com/">
                    RentalProperty.com
                  </a>
                </div>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                <a
                  className="btn btn-outline-light text-white btn-floating m-1"
           
                  role="button"
                >
                  <FacebookIcon />
                </a>

                <a
                  className="btn btn-outline-light text-white btn-floating m-1"
                  role="button"
                >
                 <XIcon />
                </a>

                <a
                  className="btn btn-outline-light text-white btn-floating m-1"
                  role="button"
                >
                  <LinkedInIcon />
                </a>

                <a
                  className="btn btn-outline-light text-white btn-floating m-1"
                  role="button"
                >
                  <InstagramIcon /> 
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
