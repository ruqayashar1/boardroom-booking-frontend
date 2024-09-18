import React, { useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmDeleteAlert from "../../components/alerts/ConfirmDeleteAlert";
import ConfirmReservationApprovalAlert from "../../components/alerts/ConfirmReservationApprovalAlert";
import ConfirmVenueChangeAlert from "../../components/alerts/ConfirmVenueChangeAlert";
import MeetingLink from "./MeetingLink";
import EditReservationForm from "./EditReservationForm";
import {
  changeFromCSVToList,
  formatDateToHumanReadableForm,
  formatTimeToHumanReadableForm,
  storeCurrentSelectedBoardroomId,
} from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { boardroomSelectionList } from "../../context/customSelectors";
import {
  approveReservation,
  changeReservationVenue,
  removeReservation,
} from "../../context/reservation/reservationDetailSlice";
import { useNavigate } from "react-router-dom";
import RescheduleMeeting from "./RescheduleMeeting";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import useFetchBoardroomAdmin from "../../hooks/context/useFetchBoardroomAdmin";

const ReservationDetails = ({ reservation }) => {
  const { authUserId, isAuthenticatedUserAdmin } = useAuthenticatedUser();
  const { boardroomAdmin } = useFetchBoardroomAdmin(reservation?.boardroomId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boardroomSelection = useSelector(boardroomSelectionList);
  const [reservationVenue, setReservationVenue] = useState(
    reservation?.boardroomId
  );
  const [reschedulePaneOpen, setReschedulePaneOpen] = useState(false);
  const [reservationFormOpen, setReservationFormOpen] = useState(false);
  const meetingDescriptionRef = useRef();
  const attendeesRef = useRef();
  const toggleMeetingDescription = (e) => {
    e.preventDefault();
    meetingDescriptionRef.current.classList.toggle("hidden");
  };
  const toggleAttendees = (e) => {
    e.preventDefault();
    attendeesRef.current.classList.toggle("hidden");
    attendeesRef.current.classList.toggle("flex");
  };

  const toggleResevationEditForm = (e) => {
    e.preventDefault();
    setReservationFormOpen((prev) => !prev);
  };

  const updateResevationVenueFromServer = (boardroomId) => {
    setReservationVenue(boardroomId);
    const reservationId = reservation?.id;
    const newVenue = {
      boardroomId: boardroomId,
    };
    dispatch(changeReservationVenue({ reservationId, newVenue }));
    storeCurrentSelectedBoardroomId(boardroomId);
    navigate(`/boardrooms/${reservation?.tag}`, {
      state: { boardroomId: boardroomId },
    });
  };

  const handleApproval = (approve) => {
    const reservationId = reservation?.id;
    const approval = {
      approvalStatus: approve,
    };
    dispatch(approveReservation({ reservationId, approval }));
  };

  const handleReservationDeletion = () => {
    const reservationId = reservation?.id;
    dispatch(removeReservation(reservationId));
    navigate(-1);
  };

  const confirmDeletion = (e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmDeleteAlert
          onClose={onClose}
          handleReservationDeletion={handleReservationDeletion}
        />
      ),
    });
  };

  const confirmApproval = (e, isAcceptButton) => {
    e.preventDefault();
    return confirmAlert({
      customUI: ({ onClose, on }) => (
        <ConfirmReservationApprovalAlert
          onClose={onClose}
          isAcceptButton={isAcceptButton}
          handleApproval={handleApproval}
        />
      ),
    });
  };

  const confirmVenueChange = (newVenue) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        const confirmAcceptedFunc = (accepted) => {
          if (accepted) {
            updateResevationVenueFromServer(newVenue);
          }
        };
        return (
          <ConfirmVenueChangeAlert
            onClose={onClose}
            confirmAcceptedFunc={confirmAcceptedFunc}
          />
        );
      },
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    confirmVenueChange(e.target.value);
  };

  const openReschedulePane = (e) => {
    e.preventDefault();
    setReschedulePaneOpen(true);
  };

  const closeReschedulePane = (e) => {
    e.preventDefault();
    setReschedulePaneOpen(false);
  };

  const approvalStatus = {
    APPROVED: ["APPROVED", "text-[#06ABDD]"],
    PENDING: ["PENDING", "text-[#DDC706]"],
    DECLINED: ["DECLINED", "text-[#DD0606]"],
  };

  const attendees = changeFromCSVToList(reservation?.attendees);

  return (
    <section className="w-[100%] h-max shadow mb-4 bg-white font-[Inter]">
      <div
        id="detail-area"
        className="w-[95%] grid grid-cols-12 auto-rows-auto gap-2 mx-auto p-2 opacity-80 hover:opacity-100"
      >
        <div
          id="booked-by"
          className="col-start-1 col-end-7 row-start-1 row-end-2 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Booked by:
            <b className="text-[#024458] ml-2">{reservation?.reservedBy}</b>
          </h3>
        </div>
        <div
          id="user-email"
          className="col-start-1 col-end-7 row-start-2 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Email:
            <b className="text-[#024458] ml-2">{reservation?.ownerEmail}</b>
          </h3>
        </div>
        <div
          id="approval-status"
          className="col-start-7 col-end-13 row-start-1 row-end-3 bg-[#D9D9D9] bg-opacity-[21%] shadow flex justify-center items-center"
        >
          <h3
            className={`uppercase font-bold ${
              approvalStatus[reservation?.approvalStatus][1]
            }`}
          >
            {approvalStatus[reservation?.approvalStatus][0]}
          </h3>
        </div>
        <div
          id="meeting-type"
          className={`col-start-1 ${
            reservation?.approvalStatus === "APPROVED"
              ? "col-end-7"
              : "col-end-13"
          } row-start-3 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2`}
        >
          <h3 className="font-bold opacity-70 m-1">
            Meeting Type:
            <b className="text-[#024458] ml-2">{reservation?.meetingType}</b>
          </h3>
        </div>
        {reservation?.approvalStatus === "APPROVED" && (
          <div
            id="meeting-link"
            className="col-start-7 col-end-13 row-start-3 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
          >
            <MeetingLink
              meetingLinkUrl={reservation?.meetingLink}
              isAuthenticatedUserAdmin={isAuthenticatedUserAdmin}
            />
          </div>
        )}
        <div
          id="meeting-dates"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow flex p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Start Date:{" "}
            <b className="text-[#024458] ml-2">
              {formatDateToHumanReadableForm(reservation?.startDate)}
            </b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            Start Time:{" "}
            <b className="text-[#024458] ml-2">
              {formatTimeToHumanReadableForm(
                reservation?.startDate,
                reservation?.startTime
              )}
            </b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            End Date:{" "}
            <b className="text-[#024458] ml-2">
              {formatDateToHumanReadableForm(reservation?.endDate)}
            </b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            End Time:{" "}
            <b className="text-[#024458] ml-2">
              {formatTimeToHumanReadableForm(
                reservation?.endDate,
                reservation?.endTime
              )}
            </b>
          </h3>
        </div>
        <div
          id="meeting-title"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="inline-block font-bold opacity-70 mr-2">Title: </h3>{" "}
          <span className="text-sm">{reservation?.meetingTitle}</span>
        </div>
        <div
          id="meeting-description"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2 relative"
        >
          <div
            onClick={toggleMeetingDescription}
            className="absolute right-0 top-0 cursor-pointer z-10 p-2"
          >
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </div>
          <h3 className="w-full inline-block font-bold opacity-70 mr-1 mb-2 text-center">
            Event Details
          </h3>
          <p
            ref={meetingDescriptionRef}
            className="text-md  p-2 indent-10 bg-white hidden"
          >
            {reservation?.meetingDescription}
          </p>
        </div>
        <div
          id="attendees"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2 relative"
        >
          <div
            onClick={toggleAttendees}
            className="absolute right-0 top-0 cursor-pointer z-10 p-2"
          >
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </div>
          <h3 className="inline-block font-bold m-1">Attendees: </h3>{" "}
          <div ref={attendeesRef} className="hidden justify-evenly flex-wrap">
            {attendees.map((attendee) => (
              <span
                key={attendee}
                className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono"
              >
                {attendee}
              </span>
            ))}
          </div>
        </div>
        <div
          id="reschedue-approval-area"
          className="col-start-1 col-end-13 flex flex-col gap-2 p-2 py-10 justify-start items-center relative sm:flex-row sm:justify-between"
        >
          {authUserId === reservation?.userId && (
            <div className="w-full sm:w-[50%] flex flex-col gap-4 mb-4 sm:flex-row sm:mb-0">
              <div className="relative w-full sm:w-auto">
                <h3 className="font-bold opacity-70 m-1 absolute top-0">
                  Change venue
                </h3>
                <div className="shadow w-full sm:w-auto bg-[#D9D9D9] relative inline-block px-2 mt-6 sm:mt-0">
                  <select
                    onChange={handleInputChange}
                    value={reservationVenue}
                    className="bg-[#D9D9D9] cursor-pointer p-2 outline-none block appearance-none w-full sm:w-auto px-4 mr-2"
                  >
                    {boardroomSelection.map((boardroom) => (
                      <option
                        className={`${boardroom.locked && "bg-red-200"}`}
                        key={boardroom.id}
                        value={boardroom.id}
                        disabled={boardroom.locked}
                      >
                        {boardroom.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                      className="fill-current h-6 w-6"
                    >
                      <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                onClick={openReschedulePane}
                className="flex justify-center items-center w-full sm:w-auto h-max p-2 bg-[#D9D9D9]"
              >
                <span className="material-symbols-outlined opacity-70 mr-2">
                  refresh
                </span>
                <h3 className="opacity-70 inline-block">Reschedule</h3>
              </button>
            </div>
          )}
          {authUserId === reservation?.userId && (
            <div className="flex justify-end items-center w-full sm:w-[50%] font-bold text-white mb-4 sm:mb-0">
              {/* <button
            onClick={toggleResevationEditForm}
            className="bg-blue-300 w-24 h-max p-2 mr-2"
          >
            EDIT
          </button> */}
              <button
                onClick={confirmDeletion}
                className="bg-[#D4342C] w-24 h-max p-2"
              >
                DELETE
              </button>
            </div>
          )}
          {authUserId === boardroomAdmin?.id && (
            <div className="flex justify-end items-center w-full sm:w-[50%] font-bold text-white">
              {reservation?.approvalStatus !== "APPROVED" && (
                <button
                  onClick={(e) => confirmApproval(e, true)}
                  className="bg-[#52AC43] w-24 h-max p-2 mr-2"
                >
                  ACCEPT
                </button>
              )}
              <button
                onClick={(e) => confirmApproval(e, false)}
                className="bg-[#D4342C] w-24 h-max p-2"
              >
                DECLINE
              </button>
            </div>
          )}
        </div>
      </div>
      {reservationFormOpen ? (
        <EditReservationForm
          toggleForm={toggleResevationEditForm}
          boardroom={null}
          reservation={reservation}
        />
      ) : null}
      {reschedulePaneOpen ? (
        <RescheduleMeeting
          reservation={reservation}
          onClose={closeReschedulePane}
        />
      ) : null}
    </section>
  );
};

export default ReservationDetails;
