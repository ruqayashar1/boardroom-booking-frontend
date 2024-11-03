import moment from "moment/moment";
import React, { useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import useFetchBoardroomReservations from "../../hooks/context/useFetchBoardroomReservations";
import {
  getCurrentSelectedBoardroomId,
  getDateAndTimeFromDateIsoString,
  joinDateAndTime,
  storeSelectedCalendarDate,
} from "../../functions";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useOutletContext } from "react-router-dom";
import CalendarEvent from "./CalendarEvent";
import { rescheduleReservation } from "../../context/reservation/reservationDetailSlice";
import { useDispatch } from "react-redux";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

// Constants for views
const VIEW_OPTIONS = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "agenda", label: "Agenda" },
];

// Constants
const PRIMARY_COLOR = "bg-[#17405d]";

const ReservationBigCalendar = () => {
  const { authUserId } = useAuthenticatedUser();
  const dispatch = useDispatch();
  const { toggleReservationForm, boardroom } = useOutletContext();
  const boardroomId = getCurrentSelectedBoardroomId();
  const { reservations } = useFetchBoardroomReservations(boardroomId);

  const events =
    reservations.length === 0
      ? []
      : reservations.map((reservation) => ({
          id: reservation.id,
          userId: reservation.userId,
          title: reservation.meetingTitle,
          start: joinDateAndTime(reservation.startDate, reservation.startTime),
          end: joinDateAndTime(reservation.endDate, reservation.endTime),
          meetingType: reservation.meetingType,
          boardroomName: reservation.boardroomName,
          reservedBy: reservation.reservedBy,
          approvalStatus: reservation.approvalStatus,
          ictSupportRequired: reservation.ictSupportRequired,
          isUrgentMeeting: reservation.isUrgentMeeting,
          recordMeeting: reservation.recordMeeting,
          cancellationMessage: reservation.cancellationMessage,
        }));

  // Custom event component
  const EventComponent = ({ event }) => {
    return <CalendarEvent event={event} />;
  };

  // Function to check if a slot is a future date and time
  const isFutureSlot = (date) => moment(date).isSameOrAfter(moment());
  const isSlotBooked = (date) =>
    events.some((event) =>
      moment(date).isBetween(event.start, event.end, null, "[)")
    );

  const handleEventDrop = ({ event, start, end }) => {
    if (
      isFutureSlot(start) &&
      !boardroom?.locked &&
      event?.userId === authUserId
    ) {
      const rescheduleData = {
        startDateTime: new Date(start).toISOString(),
        endDateTime: new Date(end).toISOString(),
      };
      dispatch(
        rescheduleReservation({
          reservationId: event?.id,
          rescheduleData: rescheduleData,
        })
      );
    }
  };
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("week"); // e.g., day, week, month

  const onPrevClick = useCallback(() => {
    setDate((prev) =>
      moment(prev)
        .subtract(1, view === "day" ? "d" : "w")
        .toDate()
    );
  }, [view]);

  const onNextClick = useCallback(() => {
    setDate((prev) =>
      moment(prev)
        .add(1, view === "day" ? "d" : "w")
        .toDate()
    );
  }, [view]);

  const dateText = useMemo(() => {
    if (view === "day") return moment(date).format("dddd, MMMM DD");
    if (view === "week") {
      const from = moment(date).startOf("week");
      const to = moment(date).endOf("week");
      return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
    }
    return moment(date).format("MMMM YYYY");
  }, [view, date]);
  const handleSelectSlot = ({ start, end }) => {
    const [startDate, startTime] = getDateAndTimeFromDateIsoString(start);
    const [endDate, endTime] = getDateAndTimeFromDateIsoString(end);

    if (isFutureSlot(start) && !boardroom?.locked) {
      const dateEvent = {
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      };
      storeSelectedCalendarDate(dateEvent);
      toggleReservationForm();
    }
  };
  return (
    <div className="h-[100vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-auto">
          <DatePicker
            selected={date}
            onChange={setDate}
            className="border-2 border-[#17405d] rounded-full px-2 py-1 w-full md:w-48"
          />
        </div>

        <div className="flex gap-2 mt-2 md:mt-0 md:gap-4 items-center">
          <button
            onClick={() => setDate(moment().toDate())}
            className="btn-primary"
          >
            Today
          </button>

          <div className="flex items-center">
            <button onClick={onPrevClick} className="icon-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>

            <div
              className={`px-4 ${PRIMARY_COLOR} text-white flex items-center justify-center w-32 md:w-64`}
            >
              <span className="text-medium">{dateText}</span>
            </div>

            <button onClick={onNextClick} className="icon-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* View Options */}
        <div className="flex gap-2 mt-2 md:mt-0">
          {VIEW_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`py-1 px-3 rounded ${
                view === id
                  ? `${PRIMARY_COLOR} text-white`
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="week"
        style={{ height: 600 }}
        min={new Date(1970, 1, 1, 6, 0, 0)}
        max={new Date(1970, 1, 1, 19, 0, 0)}
        onEventDrop={handleEventDrop}
        components={{
          timeSlotWrapper: ({ value, children }) => (
            <div className="relative">
              {isFutureSlot(value) &&
              !isSlotBooked(value) &&
              !boardroom?.locked ? (
                <div className="group">
                  {children}
                  <div className="h-min !z-10 absolute bottom-0 inset-0 shadow flex items-center justify-center cursor-pointer bg-green-500 bg-opacity-70 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Book Event Here
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
          ),
          event: EventComponent,
        }}
        onSelectSlot={handleSelectSlot}
        toolbar={false}
        date={date}
        view={view}
        onView={setView}
        onNavigate={setDate}
      />
    </div>
  );
};

export default ReservationBigCalendar;
