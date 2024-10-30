import moment from "moment/moment";
import React from "react";
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
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const ReservationBigCalendar = () => {
  const { toggleReservationForm, boardroom } = useOutletContext();
  const boardroomId = getCurrentSelectedBoardroomId();
  const { reservations } = useFetchBoardroomReservations(boardroomId);
  const events =
    reservations.length === 0
      ? []
      : reservations.map((reservation) => ({
          id: reservation.id,
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
    const updatedEvent = { ...event, start, end };
    // setEvents((prevEvents) =>
    //   prevEvents.map((ev) => (ev.title === event.title ? updatedEvent : ev))
    // );
  };
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
                  <div className="h-min z-10 absolute bottom-0 inset-0 shadow flex items-center justify-center cursor-pointer bg-green-500 bg-opacity-70 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
      />
    </div>
  );
};

export default ReservationBigCalendar;
