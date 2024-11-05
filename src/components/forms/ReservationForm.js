import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AttendeeSearch from "../../pages/reservation_detail_page/AttendeeSearch";
import {
  changeFromCSVToList,
  changeFromListToCSV,
  convertDateAndTimeToUtcIsoString,
  getSelectedCalendarDate,
} from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import useKemriEmployees from "../../hooks/context/useKemriEmployees";
import {
  clearReservationError,
  createReservation,
  updateReservation,
} from "../../context/reservation/boardroomReservationSlice";
import ErrorAlert from "../alerts/ErrorAlert";
import { parseISO, format } from "date-fns";

const createDefaultAttendees = (reservation, authUserEmail) => {
  if (reservation) {
    const attendees = changeFromCSVToList(reservation.attendees).map(
      (attendee) => ({
        email: attendee,
      })
    );
    return attendees;
  } else {
    return [{ email: authUserEmail }];
  }
};

const ReservationForm = ({ boardroom, updateFormType, reservation = null }) => {
  const dispatch = useDispatch();
  const authUserEmail = useSelector((state) => state.auth.user.email);
  const [attendees, setAttendees] = useState(
    createDefaultAttendees(reservation, authUserEmail)
  );

  const error = useSelector((state) => state.boardroomReservation.error);
  console.log(error);

  const removeError = () => {
    dispatch(clearReservationError());
  };

  // Get the start of today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Set to start of the day
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    boardroom: Yup.string().required("Boardroom is required"),
    meetingType: Yup.string().required("Meeting Type is required"),
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
          if (startDate && endDate) {
            // If both dates are provided and are the same
            if (startDate.getTime() === endDate.getTime()) {
              // Check if startTime and endTime are provided
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
          }
          return true; // Pass if dates are not the same or if either time is not provided
        }
      ),
    attendees: Yup.number()
      .min(1, "There must be at least one attendee.")
      .required("Attendees is required"),
  });
  const selectedCalendarDate = getSelectedCalendarDate();
  const formik = useFormik({
    initialValues: {
      title: reservation?.meetingTitle || "",
      description: reservation?.meetingDescription || "",
      boardroom: reservation?.boardroomName || boardroom?.name,
      meetingType: reservation?.meetingType || "PHYSICAL",
      ictSupport: reservation?.ictSupportRequired || true,
      startDate:
        reservation?.startDate || selectedCalendarDate?.startDate || "",
      startTime:
        reservation?.startTime?.substring(0, 5) ||
        selectedCalendarDate?.startTime ||
        "",
      endDate: reservation?.endDate || selectedCalendarDate?.endDate || "",
      endTime:
        reservation?.endTime?.substring(0, 5) ||
        selectedCalendarDate?.endTime ||
        "",
      attendees: attendees?.length,
      urgent: reservation?.isUrgentMeeting || false,
      recordMeeting: reservation?.recordMeeting || false,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const numberOfAttendees = attendees.length;
      setTimeout(() => {
        if (values?.meetingType === "HYBRID") {
          if (numberOfAttendees < 1) {
            formik.setFieldError(
              "attendees",
              "There must be at least one attendee."
            );
          } else {
            updateFormType
              ? updateReservationOnServer(values)
              : createReservationOnServer(values);
          }
        } else {
          if (numberOfAttendees < 1) {
            formik.setFieldError(
              "attendees",
              "There must be at least one attendee."
            );
          } else if (numberOfAttendees > boardroom?.capacity) {
            formik.setFieldError(
              "attendees",
              `Attendees exceed the capacity (${boardroom?.capacity}) of the boardroom.`
            );
          } else {
            updateFormType
              ? updateReservationOnServer(values)
              : createReservationOnServer(values);
          }
        }
        setSubmitting(false);
      }, 1000);
    },
  });

  const chooseAttendees = (attendee) => {
    setAttendees([attendee, ...attendees]);
  };

  const removeAttendee = (attendee) => {
    setAttendees((prev) => prev.filter((a) => a.email !== attendee.email));
  };

  const kemriEmployees = useKemriEmployees();

  const prepareReservationDetails = (val) => {
    const startDateTime = convertDateAndTimeToUtcIsoString(
      val?.startDate,
      val?.startTime
    );
    const endDateTime = convertDateAndTimeToUtcIsoString(
      val?.endDate,
      val?.endTime
    );
    const emailList = attendees.map((attendee) => attendee?.email);
    const attendeesCSVString = changeFromListToCSV(emailList);
    const formData = {
      meetingTitle: val?.title,
      meetingDescription: val?.description,
      meetingType: val?.meetingType,
      attendees: attendeesCSVString,
      boardroomId: reservation?.boardroomId || boardroom?.id,
      ictSupportRequired: val?.ictSupport,
      isUrgentMeeting: val?.urgent,
      recordMeeting: val?.recordMeeting,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };
    return formData;
  };

  const createReservationOnServer = async (val) => {
    const newReservation = prepareReservationDetails(val);
    dispatch(createReservation(newReservation));
  };

  const updateReservationOnServer = (val) => {
    const newReservation = prepareReservationDetails(val);
    dispatch(
      updateReservation({ reservationId: reservation?.id, newReservation })
    );
  };

  return (
    <>
      {error && (
        <ErrorAlert removeError={removeError} message={error?.message} />
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full p-4 bg-white space-y-4"
      >
        <div className="bg-gray-100 p-4 shadow flex flex-col gap-4">
          {/* Title and Description */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <label
              htmlFor="title"
              className="w-full md:w-1/4 font-medium text-gray-700"
            >
              Title
            </label>
            <div className="w-full md:w-3/4 mt-2 md:mt-0">
              <input
                type="text"
                name="title"
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                  formik.touched.title
                    ? formik.errors.title
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <label
              htmlFor="description"
              className="w-full md:w-1/4 font-medium text-gray-700"
            >
              Description
            </label>
            <div className="w-full md:w-3/4 mt-2 md:mt-0">
              <textarea
                name="description"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={`w-full bg-white p-1.5 text-sm shadow rounded-md h-24 border-2 ${
                  formik.touched.description
                    ? formik.errors.description
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
              />
              <span className="text-xs italic mb-2">
                Please write a brief summary of your meeting
              </span>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>

          {/* Boardroom, Meeting Type, and ICT Support */}
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-2">
            {/* Boardroom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-max">
              <label
                htmlFor="boardroom"
                className="font-medium text-gray-700 md:mr-28"
              >
                Boardroom
              </label>
              <div className="w-full mt-2 md:mt-0">
                <input
                  disabled
                  type="text"
                  name="boardroom"
                  id="boardroom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.boardroom}
                  className={`w-max bg-gray-100 p-1.5 text-sm shadow rounded-md border-2 ${
                    formik.touched.boardroom
                      ? formik.errors.boardroom
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.boardroom && formik.errors.boardroom && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.boardroom}
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Type Section */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-max">
              <label
                htmlFor="meetingType"
                className="font-medium text-gray-700 text-nowrap mr-2"
              >
                Meeting Type
              </label>
              <div className="w-full mt-2 md:mt-0">
                <select
                  name="meetingType"
                  id="meetingType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.meetingType}
                  className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                    formik.touched.meetingType
                      ? formik.errors.meetingType
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="PHYSICAL">Physical</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
                {formik.touched.meetingType && formik.errors.meetingType && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.meetingType}
                  </div>
                )}
              </div>
            </div>

            {/* ICT Support Section */}
            <div className="flex justify-between items-center w-max">
              <label
                htmlFor="ictSupport"
                className="font-medium text-gray-700 text-nowrap mr-2"
              >
                ICT Support
              </label>
              <div className="w-full mt-2 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="ictSupport"
                  id="ictSupport"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.ictSupport}
                  className="bg-gray-100 shadow rounded-md w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Other Form Sections */}
        <div className="bg-gray-100 shadow p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Date and Time Fields */}
          <div className="flex flex-col w-full md:w-1/4">
            <label
              htmlFor="startDate"
              className="font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              disabled={updateFormType}
              type="date"
              name="startDate"
              id="startDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
              className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                formik.touched.startDate
                  ? formik.errors.startDate
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="text-red-500 text-sm">
                {formik.errors.startDate}
              </div>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/4">
            <label
              htmlFor="startTime"
              className="font-medium text-gray-700 mb-1"
            >
              Start Time
            </label>
            <input
              disabled={updateFormType}
              type="time"
              name="startTime"
              id="startTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                formik.touched.startTime
                  ? formik.errors.startTime
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.startTime && formik.errors.startTime && (
              <div className="text-red-500 text-sm">
                {formik.errors.startTime}
              </div>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="endDate" className="font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              disabled={updateFormType}
              type="date"
              name="endDate"
              id="endDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
              className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                formik.touched.endDate
                  ? formik.errors.endDate
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-red-500 text-sm">
                {formik.errors.endDate}
              </div>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="endTime" className="font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              disabled={updateFormType}
              type="time"
              name="endTime"
              id="endTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              className={`w-full bg-white p-1.5 text-sm shadow rounded-md border-2 ${
                formik.touched.endTime
                  ? formik.errors.endTime
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.endTime && formik.errors.endTime && (
              <div className="text-red-500 text-sm">
                {formik.errors.endTime}
              </div>
            )}
          </div>
        </div>

        <div className="shadow bg-gray-100 p-4">
          <AttendeeSearch
            kemriEmployees={kemriEmployees}
            attendees={attendees}
            chooseAttendees={chooseAttendees}
            removeAttendee={removeAttendee}
          />
          {formik.touched.attendees && formik.errors.attendees && (
            <div className="text-red-500 text-sm">
              {formik.errors.attendees}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center shadow bg-gray-100 p-4">
          <label
            htmlFor="urgent"
            className="w-full md:w-3/4 font-medium text-gray-700 mb-2 md:mb-0"
          >
            <b className="font-bold">Urgent?? </b> A meeting is urgent when it
            is set to take place in less than an hour
          </label>
          <div className="w-full md:w-1/4 flex items-center">
            <input
              type="checkbox"
              name="urgent"
              id="urgent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.urgent}
              className="bg-gray-100 shadow rounded-md w-4 h-4"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center shadow bg-gray-100 p-4">
          <label
            htmlFor="recordMeeting"
            className="w-full md:w-3/4 font-medium text-gray-700 mb-2 md:mb-0"
          >
            <b className="font-bold">Record?? </b> Do you want to allow this
            meeting to be recorded?
          </label>
          <div className="w-full md:w-1/4 flex items-center">
            <input
              type="checkbox"
              name="recordMeeting"
              id="recordMeeting"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.recordMeeting}
              className="bg-gray-100 shadow rounded-md w-4 h-4"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`bg-[#06ABDD] text-white font-bold py-2 px-4 shadow transition`}
          >
            {formik.isSubmitting
              ? "Submitting..."
              : updateFormType
              ? "Save Changes"
              : "Make Reservation"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
