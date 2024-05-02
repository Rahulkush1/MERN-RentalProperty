import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, fetchUser } from "../../Slice/userSlice";
import { userLogin } from "../../Action/userAction";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const { userInfo, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const HandleLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Login Successfully", {
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
  }, [isAuthenticated, navigate, toast, error, dispatch]);

  return (
    <>
      <div className="auth-container">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-sm-center h-100">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                <div className="text-center my-5">
                  {/* <img
                    src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
                    alt="logo"
                    width="100"
                  /> */}
                  <h2 className="text-light">RentalProperty</h2>
                </div>
                <div className="card shadow-lg">
                  <div className="card-body p-5">
                    <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                    <form
                      method="POST"
                      className="needs-validation"
                      novalidate=""
                      autocomplete="off"
                      onSubmit={HandleSubmit}
                    >
                      <div className="mb-3">
                        <label className="mb-2 text-muted" for="email">
                          E-Mail Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          value={user.email}
                          required
                          autofocus
                          onChange={HandleLogin}
                        
                        />
                        <div className="invalid-feedback">Email is invalid</div>
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 w-100">
                          <label className="text-muted" for="password">
                            Password
                          </label>
                          <a href="forgot.html" className="float-end">
                            Forgot Password?
                          </a>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          required
                          value={user.password}
                          onChange={HandleLogin}

                        />
                        <div className="invalid-feedback">Password is required</div>
                      </div>

                      <div className="d-flex align-items-center">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            className="form-check-input"
                          />
                          <label for="remember" className="form-check-label">
                            Remember Me
                          </label>
                        </div>
                        <button type="submit" className="btn btn-primary ms-auto">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer py-3 border-0">
                    <div className="text-center">
                      Don't have an account?{" "}
                      <Link to="/signuprole" className="text-dark">
                        Create One
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

export default Login;
