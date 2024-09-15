import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useBoardroomAdmin from "../../hooks/context/useBoardroomAdmin";
import { changeBoardroomAdmin } from "../../context/boardroom/boardroomAdminSlice";

const AdminCreateForm = ({ boardroom, users = [] }) => {
  const { boardroomAdmin } = useBoardroomAdmin(boardroom?.id);
  const dispatch = useDispatch();
  const isSaving = useSelector((state) => state.boardroomAdmin.isSaving);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Field is required")
        .email("The input must be an email"),
    }),
    onSubmit: (values, { resetForm }) => {
      const user = users.find((user) => user.email === values?.email);
      // Check if user exists in suggestions
      if (!user) {
        setErrorMessage("User not found. Please user must log in first.");
        resetForm();
        return; // Stop form submission if user not found
      }

      // Check if user is not current one
      if (user.email === boardroomAdmin?.email) {
        setErrorMessage(
          "The selected user is the current admin. No changes detected"
        );
        resetForm();
        return; // Stop form submission if user equal to current
      }

      // If user exists, proceed
      setErrorMessage(""); // Clear any previous errors
      setTimeout(() => {
        changeBoardroomAdminFromServer(user?.id);
        resetForm();
      }, 2000);

      setShowSuggestions(false); // Hide suggestions after submission
    },
  });

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    formik.handleChange(e);

    if (inputValue) {
      const filteredSuggestions = users.filter((user) =>
        user?.email.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    formik.setFieldValue("email", suggestion);
    setShowSuggestions(false); // Hide suggestions when one is selected
  };

  const changeBoardroomAdminFromServer = (userId) => {
    const boardromId = boardroom?.id;
    const admin = {
      userId: userId,
    };
    dispatch(changeBoardroomAdmin({ boardromId, admin }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <aside className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Boardroom Administrator
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Only one administrator is allowed per boardroom. Adding a new one will
          replace the current administrator.
        </p>

        <form onSubmit={formik.handleSubmit} className="mb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <input
              className={`flex-1 h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              type="email"
              name="email"
              value={formik.values.email}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              placeholder="Enter administrator email"
              autoComplete="off"
            />

            <button
              type="submit"
              className="mt-4 sm:mt-0 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-200 flex items-center justify-center"
              disabled={formik.isSubmitting} // Disabling the button when submitting
            >
              {formik.isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8l5.292-5.293a8 8 0 11-11.084 0z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.email}
            </div>
          ) : null}

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion?.email)}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion?.email}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="space-y-3">
          {!boardroomAdmin && !isSaving ? (
            <p className="text-center text-gray-500">
              No administrator assigned yet!
            </p>
          ) : isSaving ? (
            <span>Waiting operation to complete....</span>
          ) : (
            <div className="flex justify-between items-center bg-blue-100 py-3 px-4 rounded-lg shadow-md">
              <span className="text-gray-700">{boardroomAdmin?.email}</span>
              <span className="text-white py-2 px-3 rounded-full transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default AdminCreateForm;
