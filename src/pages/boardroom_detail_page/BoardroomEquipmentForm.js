import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { convertImageToBase64 } from "../../functions";
import {
  createEquipmentImage,
  setIsUploading,
} from "../../context/upload/uploadFileSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  createBoardroomEquipment,
  setCreatingEquipment,
} from "../../context/equipments/equipmentSlice";

const BoardroomEquipmentForm = ({ boardroom }) => {
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.fileImage.isUploading);
  const isCreatingEquipment = useSelector(
    (state) => state.equipment.isCreatingEquipment
  );
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      videoUrl: "",
      modelNumber: "",
      brand: "",
      picture: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      videoUrl: Yup.string()
        .url("Invalid URL")
        .required("Video URL is required"),
      modelNumber: Yup.string().required("Model number is required"),
      brand: Yup.string().required("Brand is required"),
      picture: Yup.mixed().required("Picture is required"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        formik.setSubmitting(false);
        createBoardroomOnServer(values);
      }, 2000);
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const base64String = await convertImageToBase64(file);
        setImagePreview(base64String);
        dispatch(setIsUploading(true));
        setTimeout(async () => {
          const imageFileName = await createBoardroomImageOnServer(formData);
          formik.setFieldValue("picture", imageFileName);
        }, 2000);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    } else {
      setImagePreview(null);
    }
  };

  const createBoardroomImageOnServer = async (formData) => {
    try {
      const result = await dispatch(createEquipmentImage(formData)).unwrap();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createBoardroomOnServer = (values) => {
    const equipment = {
      ...values,
      isDisposed: false,
      boardroomId: boardroom?.id,
    };
    dispatch(setCreatingEquipment(true));
    setTimeout(() => {
      dispatch(createBoardroomEquipment(equipment));
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 p-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Create Equipment for Boardroom - {`Random Boardroom`}
      </h2>
      <p className="mb-6 text-gray-600">
        Use this form to create new equipment for the boardroom.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 px-6 mb-6 rounded-lg shadow text-white font-semibold transition duration-200 ${
          formik.isSubmitting || isCreatingEquipment
            ? "bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={formik.isSubmitting || isUploading}
        onClick={formik.handleSubmit}
      >
        {formik.isSubmitting || isCreatingEquipment ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin mr-2 h-5 w-5 text-white"
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
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8H4z"
              ></path>
            </svg>
            Creating Equipment...
          </div>
        ) : (
          "Create Equipment"
        )}
      </button>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Title Field */}
          <div className="relative">
            <label className="block text-gray-700">Title</label>
            <input
              className={`w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            ) : (
              formik.touched.title &&
              !formik.errors.title && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
          </div>

          {/* Video URL Field */}
          <div className="relative">
            <label className="block text-gray-700">Video URL</label>
            <input
              className={`w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.videoUrl && formik.errors.videoUrl
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              name="videoUrl"
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.videoUrl && formik.errors.videoUrl ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.videoUrl}
              </p>
            ) : (
              formik.touched.videoUrl &&
              !formik.errors.videoUrl && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
          </div>

          {/* Model Number Field */}
          <div className="relative">
            <label className="block text-gray-700">Model Number</label>
            <input
              className={`w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.modelNumber && formik.errors.modelNumber
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              name="modelNumber"
              value={formik.values.modelNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.modelNumber && formik.errors.modelNumber ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.modelNumber}
              </p>
            ) : (
              formik.touched.modelNumber &&
              !formik.errors.modelNumber && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
          </div>

          {/* Brand Field */}
          <div className="relative">
            <label className="block text-gray-700">Brand</label>
            <input
              className={`w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.brand && formik.errors.brand
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.brand && formik.errors.brand ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.brand}</p>
            ) : (
              formik.touched.brand &&
              !formik.errors.brand && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
          </div>

          {/* Description Field (Full Width) */}
          <div className="relative col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              className={`w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            ) : (
              formik.touched.description &&
              !formik.errors.description && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
          </div>

          {/* Picture Field (Full Width) */}
          <div className="relative col-span-2">
            <label className="block text-gray-700">Picture</label>
            <input
              className={`w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.picture && formik.errors.picture
                  ? "border-red-500"
                  : ""
              }`}
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.picture && formik.errors.picture ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.picture}
              </p>
            ) : (
              formik.touched.picture &&
              !formik.errors.picture && (
                <svg
                  className="absolute top-0 right-0 mt-4 mr-4 text-green-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
            {imagePreview && (
              <div className="mt-4">
                {isUploading ? (
                  <div className="flex justify-center items-center p-4">
                    <div className="flex items-center gap-4">
                      {/* Loader */}
                      <ClipLoader color="#36D7B7" size={50} />
                      {/* Text */}
                      <p className="text-lg text-gray-700">
                        Wait as we process the image...
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={imagePreview}
                    alt="Selected Preview"
                    className="h-40 w-full object-contain border border-gray-300 rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardroomEquipmentForm;
