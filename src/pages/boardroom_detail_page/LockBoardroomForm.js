import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  lockBoardroom,
  setIsLocking,
} from "../../context/boardroom/selectedBoardroomSlice";

const LockBoardroomForm = ({ boardroom, toggleLockRoomForm }) => {
  const dispatch = useDispatch();
  const isLocking = useSelector((state) => state.selectedBoardroom.isLocking);

  // Validation schema
  const validationSchema = Yup.object().shape({
    lockBoardroom: Yup.boolean()
      .oneOf([true, false], "You must lock the boardroom to proceed.")
      .required("This field is required"),
    givenReason: Yup.string().required("Please provide a reason"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      lockBoardroom: false,
      givenReason: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setIsLocking(true));
      setTimeout(() => {
        lockBoardroomFromServer(values);
        formik.setSubmitting(false);
      }, 2000); // 2-second delay
    },
  });

  const lockBoardroomFromServer = (values) => {
    const valuesToSubmit = { ...values };
    delete valuesToSubmit.lockBoardroom;
    dispatch(
      lockBoardroom({ boardroomId: boardroom?.id, reason: valuesToSubmit })
    );
    toggleLockRoomForm();
  };

  return (
    <div className="w-full max-w-md shadow-lg rounded-lg bg-white p-8 mx-auto">
      {/* Form Description */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Would you like to lock this room? After doing so, no further
        reservations can be made.
      </h2>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        {/* Lock Boardroom Checkbox */}
        <div className="mb-6 relative">
          <label className="flex items-center space-x-3 text-gray-700 text-lg">
            <input
              type="checkbox"
              name="lockBoardroom"
              checked={formik.values.lockBoardroom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span>Lock Boardroom</span>
          </label>
          {formik.touched.lockBoardroom && formik.errors.lockBoardroom ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.lockBoardroom}
            </div>
          ) : null}
        </div>

        {/* Given Reason Textarea (Only shown if Lock Boardroom is checked) */}
        {formik.values.lockBoardroom && (
          <div className="mb-6 relative">
            <label
              htmlFor="givenReason"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Given Reason
            </label>
            <textarea
              id="givenReason"
              name="givenReason"
              rows="4"
              value={formik.values.givenReason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 border ${
                formik.touched.givenReason && formik.errors.givenReason
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter the reason for locking the boardroom"
            ></textarea>
            {formik.touched.givenReason && formik.errors.givenReason ? (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.givenReason}
              </div>
            ) : null}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold focus:outline-none transition ease-in-out duration-150"
          disabled={formik.isSubmitting || isLocking} // Disable button when loading
        >
          {formik.isSubmitting || isLocking ? (
            <>
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
              Locking Boardroom...
            </>
          ) : (
            "Lock Boardroom"
          )}
        </button>
      </form>
    </div>
  );
};

export default LockBoardroomForm;
