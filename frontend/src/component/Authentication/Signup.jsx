import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Action/userAction";
import { toast } from "react-toastify";
import { clearErrors } from "../../Slice/userSlice";
import validator from 'validator'

function Signup() {
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState({
    role: searchParams.get("role"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.user);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  console.log(userData);
  const Register = (e) => {
    e.preventDefault();
    if (
      !userData.email ||
      !userData.password ||
      !userData.first_name ||
      !userData.last_name
    ) {
      toast.error("All Fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!validator.isEmail(userData.email)) {
      toast.error("inValid Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }    
    else if (userData.password === userData.password2) {
      dispatch(registerUser({ userData }));
    } else {
      toast.error("Password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      toast.success("Registered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, success, error, toast]);

  return (
    <>
      
      <div className="auth-container">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-sm-center h-100">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                <div className="text-center my-3">
                <h2 className="text-light">RentalProperty</h2>
                </div>
                <div className="card shadow-lg">
                  <div className="card-body p-5">
                    <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                    <form
                      method="POST"
                      className="needs-validation"
                      novalidate=""
                      autocomplete="off"
                      onSubmit={Register}
                    >
                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="name">
                          First Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          name="first_name"
                          required
                          autofocus
                          onChange={handleInput}
                          value={userData.first_name}
                        />
                        <div className="invalid-feedback">Name is required</div>
                      </div>
                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="name">
                          Last Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          name="last_name"
                          required
                          autofocus
                          onChange={handleInput}
                          value={userData.last_name}
                        />
                        <div className="invalid-feedback">Name is required</div>
                      </div>

                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="email">
                          E-Mail Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          required
                          onChange={handleInput}
                          value={userData.email}
                        />
                        <div className="invalid-feedback">Email is invalid</div>
                      </div>

                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="password">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          required
                          onChange={handleInput}
                          value={userData.password}
                        />
                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="password2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password2"
                          required
                          onChange={handleInput}
                          value={userData.password2}
                        />
                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>

                      <p className="form-text text-muted mb-3">
                        By registering you agree with our terms and condition.
                      </p>

                      <div className="align-items-center d-flex">
                        <button
                          type="submit"
                          className="btn btn-primary ms-auto"
                          disabled={loading ? true : false}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer py-3 border-0">
                    <div className="text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-dark">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-5 text-muted">
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
export default Signup;
