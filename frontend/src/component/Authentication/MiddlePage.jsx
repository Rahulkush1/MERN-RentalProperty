import React, { useEffect, useState } from "react";
import "./MiddlePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Action/userAction";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/userSlice";

function MiddlePage() {
  return (
    <>
      <div className="auth-container">
        <section class="h-100">
          <div class="container h-100">
            <div class="row justify-content-sm-center h-100">
              <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                <div class="text-center my-5"></div>
                <div class="card shadow-lg">
                  <div class="card-body p-5">
                    <h1 class="fs-4 card-title fw-bold mb-4">Register As</h1>
                    <div className="center d-flex flex-column justify-content-center align-items-center">
                      <Link to={"/signup?role=OWNER"}>
                        <button className="owner-btn my-3">Owner</button>
                      </Link>
                      <Link to={"/signup?role=BROKER"}>
                        <button className="broker-btn facebook my-3">
                          Broker
                        </button>
                      </Link>
                      <Link to={"/signup?role=USER"}>
                        <button className="buyer-btn google my-3">Buyer</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-5 text-muted">
                Copyright &copy; 2017- {new Date().getFullYear()} &mdash; RentalProperty
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default MiddlePage;
