import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div className="w-[90%] m-auto md:w-[90%] 2xl:w-[70%]">
      <ToastContainer
        position="bottom-left"
        autoClose={5002}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Layout />
    </div>
  );
};

export default App;
