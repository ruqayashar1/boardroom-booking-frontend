import React, { useState } from "react";
import _ from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { convertImageToBase64 } from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoardroom,
  updateBoardroom,
} from "../../context/boardroom/boardroomSlice";
import { ColorRing } from "react-loader-spinner";
import { createBoardroomImage } from "../../context/upload/uploadFileSlice";

function BoardroomForm({ boardroom }) {
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.fileImage.isUploading);
  const imageUrl = useSelector(
    (state) => state.fileImage.boardroomImage[boardroom?.id]
  );
  const [imagePreview, setImagePreview] = useState(imageUrl);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    centre: Yup.string().required("Centre is required"),
    department: Yup.string().required("Department is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    capacity: Yup.number().required("Capacity is required"),
    description: Yup.string().required("Description is required"),
    boardroomImage: Yup.mixed().required("Profile picture is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: boardroom?.id || null,
      name: boardroom?.name || "",
      centre: boardroom?.centre || "",
      department: boardroom?.department || "",
      email: boardroom?.email || "",
      capacity: boardroom?.capacity || "",
      internetEnabled: boardroom?.internetEnabled || true,
      description: boardroom?.description || "",
      boardroomImage: boardroom?.picture || null,
    },
    validationSchema,
    onSubmit: (values) => {
      createBoardroomOnServer(values);
      // Handle form submission
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const base64String = await convertImageToBase64(file);
        setImagePreview(base64String);
        const imageFileName = await createBoardroomImageOnServer(formData);
        formik.setFieldValue("boardroomImage", imageFileName);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    } else {
      setImagePreview(null);
    }
  };

  const createBoardroomOnServer = (data) => {
    const newBoardroom = {
      ...data,
      meetingTypeSupported: "Physical,Hybrid",
      picture: data.boardroomImage,
    };
    delete newBoardroom.boardroomImage;
    console.log(newBoardroom);
    const boardroomId = newBoardroom?.id;
    console.log(boardroomId);

    setTimeout(() => {
      formik.setSubmitting(false);
      console.log(boardroomId);
      if (newBoardroom?.id !== null) {
        dispatch(updateBoardroom({ boardroomId, newBoardroom }));
      } else {
        dispatch(createBoardroom(newBoardroom));
      }
    }, 1000);
  };

  const createBoardroomImageOnServer = async (formData) => {
    try {
      const result = await dispatch(createBoardroomImage(formData)).unwrap();
      return result; // You can return the value here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="add-boardroom" className="p-4 mb-52 bg-gray-100">
      <div className="w-full max-w-4xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg font-[Roboto] shadow-md flex flex-col gap-6 sm:flex-row sm:gap-8"
        >
          <div className="flex flex-col gap-6 flex-1">
            {["name", "centre", "department", "email"].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg outline-none p-2 text-sm mb-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                />
                {formik.touched[field] && formik.errors[field] ? (
                  <span className="text-red-500 text-sm italic">
                    {formik.errors[field]}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div>
              <label className="block mb-1 font-medium" htmlFor="capacity">
                Capacity
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg outline-none p-2 text-sm mb-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="number"
                name="capacity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.capacity}
              />
              {formik.touched.capacity && formik.errors.capacity ? (
                <span className="text-red-500 text-sm italic">
                  {formik.errors.capacity}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <label className="font-medium" htmlFor="internet">
                Contains Internet?
              </label>
              <input
                className="shadow-sm rounded focus:outline-none focus:ring focus:ring-blue-200"
                type="checkbox"
                name="internetEnabled"
                onChange={formik.handleChange}
                checked={formik.values.internetEnabled}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="description">
                Brief Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg outline-none p-2 text-sm mb-1 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                rows="7"
              />
              {formik.touched.description && formik.errors.description ? (
                <span className="text-red-500 text-sm italic">
                  {formik.errors.description}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div>
              <label
                className="block mb-2 font-medium"
                htmlFor="boardroomImage"
              >
                Choose a boardroom profile picture:
              </label>
              <input
                type="file"
                id="boardroomImage"
                name="boardroomImage"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="p-1 focus:outline-none focus:ring focus:ring-blue-200"
              />
              {formik.touched.boardroomImage && formik.errors.boardroomImage ? (
                <span className="text-red-500 text-sm italic">
                  {formik.errors.boardroomImage}
                </span>
              ) : null}
              {isUploading ? (
                <div className="flex justify-center items-center bg-gray-200">
                  <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )
              )}
            </div>

            <input
              className="bg-blue-500 w-full p-2 font-bold text-white cursor-pointer rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition"
              type="submit"
              value={boardroom ? "Update Boardroom" : "Create Boardroom"}
              disabled={isUploading}
            />
            {formik.isSubmitting && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-xs italic text-yellow-500 tracking-wider">
                  <div className="flex justify-center items-center bg-gray-200">
                    <ColorRing
                      visible={true}
                      height="60"
                      width="60"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  </div>
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardroomForm;
