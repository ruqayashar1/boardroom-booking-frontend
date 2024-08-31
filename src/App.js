import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div className="w-[90%] m-auto md:w-[85%] 2xl:w-[60%]">
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
