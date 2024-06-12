import React from "react";
import { Oval } from "react-loader-spinner";
import login_image from "../assets/kemri-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../context/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  return (
    <>
      <header className="flex justify-center items-center h-[70px] p-2 shadow-sm">
        <h3 className="font-bold text-[#06ABDD] font-[Inter]">
          BOARDROOM BOOKING
        </h3>
      </header>
      <section
        id="login-area"
        className="flex flex-col justify-center items-center my-8"
      >
        <div
          id="top-loging-area"
          className="flex flex-col justify-center items-center"
        >
          <img src={login_image} alt="logo" className="w-40 h-40 mb-4" />
          <h4 className="text-[#DD0606] text-[1.5rem] mb-9 font-bold font-[Poppins] italic drop-shadow-lg">
            In Search Of Better Health
          </h4>
        </div>
        <form id="login-form" className="font-[Inter]" action="">
          <div id="login-username" className="">
            <div className="bg-[#D9D9D9] bg-opacity-[50%] flex justify-around p-1 items-center rounded-sm">
              <span className="material-symbols-outlined opacity-50 mx-1 mr-2">
                person
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="outline-none p-1 bg-[#D9D9D9] bg-opacity-[10%]"
              />
              <span className="material-symbols-outlined text-green-500 mx-1">
                check
              </span>
            </div>
            <span id="error" className="font-thin text-sm text-red-600 mb-2">
              username required!
            </span>
          </div>
          <div id="login-password" className="mt-2">
            <div className="bg-[#D9D9D9] bg-opacity-[50%] mb-1 flex justify-around p-1 items-center rounded-sm">
              <span className="material-symbols-outlined opacity-50 mx-1 mr-2">
                lock
              </span>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="outline-none p-1 bg-[#D9D9D9] bg-opacity-[10%]"
              />
              <span className="material-symbols-outlined text-green-500 mx-1">
                check
              </span>
            </div>
            <span id="error" className="font-thin text-sm text-red-600 mb-2">
              password required!
            </span>
          </div>
          <div
            id="login-submit"
            className="relative flex justify-center items-center mt-5"
          >
            <input
              onClick={() => {
                dispatch(authenticate(true));
                navigation("/home");
              }}
              type="submit"
              value="Login"
              className="bg-[#06ABDD] text-white font-bold p-2 mr-2 w-24 cursor-pointer rounded-sm"
            />
            <Oval
              visible={true}
              height="32"
              width="32"
              color="#FF956C"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
