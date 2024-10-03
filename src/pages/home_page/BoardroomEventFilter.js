import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format, parseISO } from "date-fns";
import { Oval } from "react-loader-spinner"; // Make sure to install this package
import { useDispatch, useSelector } from "react-redux";
import {
  clearOverlapedBoardrooms,
  fetchOverlapedBoardroomsByEventDate,
  setIsFetchingOverlapedRooms,
} from "../../context/boardroom/boardroomSlice";
import { convertDateAndTimeToUtcIsoString } from "../../functions";
import ErrorAlert from "../../components/alerts/ErrorAlert";

const BoardroomEventFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const boardrooms = useSelector((state) => state.boardroom.boardrooms);
  const overlapedBoardrooms = useSelector(
    (state) => state.boardroom.overlapedBoardrooms
  );

  const boardroomMinusOverlapedRooms =
    boardrooms.length - overlapedBoardrooms.length;

  const isFetchingOverlapedRooms = useSelector(
    (state) => state.boardroom.isFetchingOverlapedRooms
  );

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Set to start of the day

  const validationSchema = Yup.object().shape({
    startDate: Yup.date()
      .min(startOfToday, "Start date must be in the future")
      .required("Start Date is required"),
    startTime: Yup.string().required("Start Time is required"),
    endDate: Yup.date()
      .min(startOfToday, "End date must be in the future")
      .required("End Date is required")
      .test(
        "is-greater-or-equal",
        "End date must be greater than or equal to start date",
        function (endDate) {
          const { startDate } = this.parent; // Access sibling field
          return startDate && endDate
            ? new Date(endDate) >= new Date(startDate)
            : true;
        }
      ),
    endTime: Yup.string()
      .required("End Time is required")
      .test(
        "is-after-start",
        "End time must be after start time if dates are the same",
        function (endTime) {
          const { startDate, startTime, endDate } = this.parent; // Access sibling fields
          if (
            startDate &&
            endDate &&
            startDate.getTime() === endDate.getTime()
          ) {
            if (startTime && endTime) {
              const startDateTimeIso = `${format(
                startDate,
                "yyyy-MM-dd"
              )}T${startTime}`;
              const endDateTimeIso = `${format(
                endDate,
                "yyyy-MM-dd"
              )}T${endTime}`;
              const startDateTime = parseISO(startDateTimeIso);
              const endDateTime = parseISO(endDateTimeIso);
              return endDateTime > startDateTime; // Check if end time is after start time
            }
          }
          return true; // Pass if dates are not the same or if either time is not provided
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(setIsFetchingOverlapedRooms(true));
      setTimeout(() => {
        setSubmitting(false);
        fetchOverlapedBoardroomByEvent(values);
      }, 3000);
    },
  });

  const prepareDateDetails = (val) => {
    const startDateTime = convertDateAndTimeToUtcIsoString(
      val?.startDate,
      val?.startTime
    );
    const endDateTime = convertDateAndTimeToUtcIsoString(
      val?.endDate,
      val?.endTime
    );
    const preparedDate = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };
    return preparedDate;
  };

  const fetchOverlapedBoardroomByEvent = (values) => {
    const eventData = prepareDateDetails(values);
    dispatch(fetchOverlapedBoardroomsByEventDate(eventData));
  };

  const removeError = () => {
    dispatch(clearOverlapedBoardrooms());
  };

  const getCorrectMessage = (number) => {
    switch (number) {
      case 1:
        return `There is ${number} available
            room for the event`;
      default:
        return `There are ${number} available
            rooms for the event`;
    }
  };

  return (
    <div className="bg-white w-96 h-max border rounded-md shadow p-2 m-2">
      <div
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md font-bold">Filter by event date</span>
        <svg
          className={`transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
        </svg>
      </div>
      {isOpen && (
        <form onSubmit={formik.handleSubmit} className="mt-2">
          {boardrooms.length - overlapedBoardrooms.length === 0 && (
            <ErrorAlert
              removeError={removeError}
              message="All boardrooms are fully booked for the selected date. Please choose a different date for your event."
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                {...formik.getFieldProps("startDate")}
                className={`mt-1 block w-full border ${
                  formik.touched.startDate && formik.errors.startDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm`}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.startDate}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                {...formik.getFieldProps("startTime")}
                className={`mt-1 block w-full border ${
                  formik.touched.startTime && formik.errors.startTime
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm`}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <div className="text-red-500 text-sm">
                  {formik.errors.startTime}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                {...formik.getFieldProps("endDate")}
                className={`mt-1 block w-full border ${
                  formik.touched.endDate && formik.errors.endDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm`}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.endDate}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                {...formik.getFieldProps("endTime")}
                className={`mt-1 block w-full border ${
                  formik.touched.endTime && formik.errors.endTime
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm`}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <div className="text-red-500 text-sm">
                  {formik.errors.endTime}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-600 text-white rounded-md flex items-center justify-center"
          >
            {formik.isSubmitting || isFetchingOverlapedRooms ? (
              <>
                <Oval type="ThreeDots" color="#ffffff" height={20} width={20} />
                <span className="ml-2">Searching rooms for you...</span>
              </>
            ) : (
              "Search Rooms"
            )}
          </button>
        </form>
      )}
      {isOpen && boardroomMinusOverlapedRooms !== 0 ? (
        <div className="mt-4">
          <span
            className="text-gray-700 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {getCorrectMessage(boardroomMinusOverlapedRooms)}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BoardroomEventFilter;
