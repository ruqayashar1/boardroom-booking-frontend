import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoardroomContact,
  removeBoardroomContact,
  setIsDeletingContact,
} from "../../context/boardroom/selectedBoardroomSlice";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";

const BoardroomContactForm = ({ boardroom }) => {
  const [contactToBeDeleted, setContactToBeDeleted] = useState(null);
  const dispatch = useDispatch();
  const isSavingContact = useSelector(
    (state) => state.selectedBoardroom.isSavingContact
  );

  const isDeletingContact = useSelector(
    (state) => state.selectedBoardroom.isDeletingContact
  );

  const formik = useFormik({
    initialValues: {
      contact: "",
    },
    validationSchema: Yup.object({
      contact: Yup.number()
        .typeError("Contact must be a number")
        .required("Contact is required")
        .test(
          "len",
          "Contact must be exactly less than 5 digits",
          (val) => val && val.toString().length <= 5
        ),
    }),
    onSubmit: (value, { resetForm }) => {
      const isContactAlreadyThere = checkIfContactIsOnRecord(value.contact);
      if (isContactAlreadyThere) {
        formik.setFieldError("contact", "Contact already exists");
        formik.setSubmitting(false);
        return;
      }
      setTimeout(() => {
        formik.setSubmitting(false);
        createBoardroomContactOnServer(value);
        resetForm();
      }, 2000);
    },
  });

  const handleDelete = (contact) => {
    setContactToBeDeleted(contact);
    removeBoardroomContactOnServer(contact);
  };

  const checkIfContactIsOnRecord = (val) => {
    const contact = boardroom?.boardroomContacts.find(
      (contact) => contact.contact === val
    );
    return contact !== undefined;
  };

  const createBoardroomContactOnServer = (value) => {
    const boardroomId = boardroom?.id;
    const contact = value;
    dispatch(createBoardroomContact({ boardroomId, contact }));
  };

  const removeBoardroomContactOnServer = (contact) => {
    dispatch(setIsDeletingContact(true));
    setTimeout(() => {
      dispatch(
        removeBoardroomContact({
          boardroomId: boardroom?.id,
          contactId: contact.id,
        })
      );
      setContactToBeDeleted(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-4 md:px-8 py-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Boardroom Contact
        </h2>
        <p className="text-center text-gray-600 mb-6">
          This form is designed to create a boardroom contact, which is a phone
          extension.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Extension
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.contact && formik.errors.contact
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.contact}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSavingContact || formik.isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none"
          >
            {isSavingContact || formik.isSubmitting ? (
              <div className="flex justify-center items-center">
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Saving contact...
              </div>
            ) : (
              "Save contact"
            )}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {boardroom?.boardroomContacts.length === 0 ? (
            <span>
              <EmptyBoxMessager
                displayText={"No boardroom contact. Create one from above!"}
              />
            </span>
          ) : (
            boardroom?.boardroomContacts.map((contact, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
              >
                <span className="font-bold">{contact?.contact}</span>
                <button
                  onClick={() => handleDelete(contact)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  {isDeletingContact && contactToBeDeleted?.id === contact.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardroomContactForm;
