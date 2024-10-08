import { useFormik } from "formik";
import * as Yup from "yup";
import { convertDateAndTimeToUtcIsoString } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { rescheduleReservation } from "../../context/reservation/reservationDetailSlice";
import { format, parseISO } from "date-fns";

const RescheduleMeeting = ({ reservation, onClose }) => {
  const dispatch = useDispatch();
  const isRescheduling = useSelector(
    (state) => state.selectedReservation.isRescheduling
  );
  // Get the start of today
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
  });
  const formik = useFormik({
    initialValues: {
      startDate: reservation?.startDate || "",
      startTime: reservation?.startTime?.substring(0, 5) || "",
      endDate: reservation?.endDate || "",
      endTime: reservation?.endTime?.substring(0, 5) || "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        rescheduleMeetingFromServer(values);
      }, 2000);
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

  const rescheduleMeetingFromServer = (values) => {
    const rescheduleData = prepareDateDetails(values);
    dispatch(
      rescheduleReservation({
        reservationId: reservation?.id,
        rescheduleData: rescheduleData,
      })
    );
  };
  return (
    <div className="w-full h-[100vh] bg-white absolute top-0 right-0 shadow z-10">
      <div className="flex justify-start p-4">
        <button
          onClick={onClose}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Cancel
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full p-4 bg-white space-y-4"
      >
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
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`bg-[#06ABDD] text-white font-bold py-2 px-4 shadow transition flex items-center justify-center ${
              formik.isSubmitting ? "cursor-not-allowed opacity-75" : ""
            }`}
            disabled={formik.isSubmitting || isRescheduling}
          >
            {formik.isSubmitting || isRescheduling ? (
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
                Saving Changes...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RescheduleMeeting;
