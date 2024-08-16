import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";
import login_image from "../assets/kemri-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticate,
  authenticateUser,
  updateUserInfoFromLocalToken,
} from "../context/auth/authSlice";
import {
  getUserInfoFromDecodedToken,
  isTokenExpired,
  retrieveAccessToken,
} from "../functions";

const LoginPage = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (userData, { setSubmitting }) => {
      setSubmitting(true);
      autheticateUserFromServer(userData);
      setSubmitting(false);
    },
  });

  const autheticateUserFromServer = (userData) => {
    dispatch(authenticateUser(userData)).then((action) => {
      if (action.type === "auth/authenticate/fulfilled") {
        navigate("/home"); // Navigate to the home page on successful login
      }
    });
  };

  const loginFromLocalStorage = () => {
    const token = retrieveAccessToken();
    const tokenExpired = isTokenExpired(token);

    if (!tokenExpired) {
      const userInfo = getUserInfoFromDecodedToken(token);
      dispatch(authenticate(true));
      dispatch(updateUserInfoFromLocalToken(userInfo));
      const previousUrl = sessionStorage.getItem("previousUrl");
      navigate(previousUrl);
    }
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, []);
  return (
    <>
      <header className="flex justify-center items-center h-[70px] p-2 shadow-sm">
        <h3 className="font-bold text-[#06ABDD] font-[Inter]">
          BOARDROOM BOOKING
        </h3>
      </header>
      <section
        id="login-area"
        className="w-96 mx-auto flex flex-col justify-center items-center my-8 px-4 md:px-0"
      >
        <div
          id="top-login-area"
          className="flex flex-col justify-center items-center"
        >
          <img
            src={login_image}
            alt="logo"
            className="w-32 h-32 mb-4 md:w-40 md:h-40"
          />
          <h4 className="text-[#DD0606] text-[1.25rem] md:text-[1.5rem] mb-6 font-bold font-[Poppins] italic drop-shadow-lg">
            In Search Of Better Health
          </h4>
        </div>
        {error && (
          <div className="w-full bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Bad credentials!!!</span>
          </div>
        )}
        <form
          id="login-form"
          className="font-[Inter] w-full"
          onSubmit={formik.handleSubmit}
        >
          <div id="login-username" className="mb-4">
            <div className="bg-[#D9D9D9] bg-opacity-[50%] flex justify-around p-2 items-center rounded-sm">
              <span className="material-symbols-outlined opacity-50 mx-1 mr-2">
                person
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`outline-none p-1 bg-[#D9D9D9] bg-opacity-[10%] w-full ${
                  formik.errors.username && formik.touched.username
                    ? "border-red-500 border"
                    : ""
                }`}
              />
              {formik.touched.username && !formik.errors.username && (
                <span className="material-symbols-outlined text-green-500 mx-1">
                  check
                </span>
              )}
            </div>
            {formik.touched.username && formik.errors.username && (
              <span id="error" className="font-thin text-sm text-red-600 mb-2">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div id="login-password" className="mb-4">
            <div className="bg-[#D9D9D9] bg-opacity-[50%] mb-1 flex justify-around p-2 items-center rounded-sm">
              <span className="material-symbols-outlined opacity-50 mx-1 mr-2">
                lock
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`outline-none p-1 bg-[#D9D9D9] bg-opacity-[10%] w-full ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500 border"
                    : ""
                }`}
              />
              {formik.touched.password && !formik.errors.password && (
                <span className="material-symbols-outlined text-green-500 mx-1">
                  check
                </span>
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <span id="error" className="font-thin text-sm text-red-600 mb-2">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div
            id="login-submit"
            className="relative flex justify-center items-center mt-5"
          >
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-[#06ABDD] text-white font-bold mr-6 p-2 w-24 cursor-pointer rounded-sm disabled:opacity-50"
            >
              Login
            </button>
            {isLoading && (
              <Oval
                visible={true}
                height="32"
                width="32"
                color="#FF956C"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
