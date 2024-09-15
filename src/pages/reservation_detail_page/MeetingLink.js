import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CopyToClipboard from "../../components/CopyToClipboard";
import { useDispatch } from "react-redux";
import { createReservationMeetingLink } from "../../context/reservation/reservationDetailSlice";
import { getCurrentSelectedReservationId } from "../../functions";

const MeetingLink = ({ meetingLinkUrl }) => {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  const handleEditButtonClick = (e) => {
    setIsEditButtonClicked(true);
    setIsFormVisible(true);
  };

  const formik = useFormik({
    initialValues: {
      meetingLink: meetingLinkUrl ? meetingLinkUrl : "",
    },
    validationSchema: Yup.object({
      meetingLink: Yup.string()
        .url("Please enter a valid URL")
        .required("Meeting link is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        createMeetingLinkOnServer(values);
        setSubmitting(false);
        setIsEditButtonClicked(false);
        setIsFormVisible(false); // Optionally close form after submit
      }, 3000);
    },
  });

  const createMeetingLinkOnServer = (meetingLink) => {
    const reservationId = getCurrentSelectedReservationId();
    dispatch(createReservationMeetingLink({ reservationId, meetingLink }));
  };

  return (
    <div className="w-full relative">
      {!isEditButtonClicked && meetingLinkUrl !== null ? (
        <div className="flex gap-3 my-2">
          <h3 className="font-bold opacity-70 m-1">
            Meeting Link:{" "}
            <a
              href={meetingLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              Open Link
            </a>
          </h3>
          <CopyToClipboard textToBeCopied={"johnmaluki.dev"} />
          <button
            onClick={handleEditButtonClick}
            className="mx-auto bg-[#06ABDD] text-white px-4 py-2 shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Link
          </button>
        </div>
      ) : (
        <>
          <div className="max-w-md mx-auto p-2 flex justify-center">
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="mx-auto bg-[#06ABDD] text-white px-4 py-2 shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Meeting Link
              </button>
            )}
          </div>

          {isFormVisible && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Enter Meeting Link</h2>
                <button
                  onClick={() => {
                    setIsFormVisible(false);
                    setIsEditButtonClicked(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#5f6368"
                  >
                    <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                  </svg>
                </button>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <label
                  htmlFor="meetingLink"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Meeting Link
                </label>
                <input
                  type="text"
                  id="meetingLink"
                  name="meetingLink"
                  placeholder="Enter your meeting link"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched.meetingLink && formik.errors.meetingLink
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.meetingLink}
                />
                {formik.touched.meetingLink && formik.errors.meetingLink ? (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.meetingLink}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className={`mt-4 bg-[#06ABDD] shadow-lg rounded-sm text-white px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formik.isSubmitting ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center">
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Submitting Changes
                    </div>
                  ) : (
                    "Submit Changes"
                  )}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MeetingLink;
