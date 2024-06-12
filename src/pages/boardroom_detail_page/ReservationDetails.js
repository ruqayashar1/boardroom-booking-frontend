import React, { useRef } from "react";

const ReservationDetails = ({
  selectedItemId,
  hideReservationDetailsPopup,
}) => {
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
  return (
    <section className="w-[60%] min-h-96 shadow bg-white z-10 absolute top-16 right-0">
      <div className="w-full h-8 bg-[#06ABDD] text-white font-bold flex justify-between items-center px-2 font-[Roboto]">
        <h4 className="font-bold m-1">INTERNAL AUDIT MEETING</h4>
        <span
          onClick={hideReservationDetailsPopup}
          title="close"
          className="material-symbols-outlined cursor-pointer hover:bg-slate-700 pr-0 opacity-80 transition-all duration-500 line-clamp-4"
        >
          close
        </span>
      </div>
      <div
        id="detail-area"
        className="w-[95%] grid grid-cols-12 auto-rows-auto gap-2 mx-auto p-2 opacity-80 hover:opacity-100"
      >
        <div
          id="booked-by"
          className="col-start-1 col-end-7 row-start-1 row-end-2 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Booked by: <b className="text-[#024458] ml-2">Levi Mulama</b>
          </h3>
        </div>
        <div
          id="user-email"
          className="col-start-1 col-end-7 row-start-2 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Email: <b className="text-[#024458] ml-2">mulama@kemri.com</b>
          </h3>
        </div>
        <div
          id="approval-status"
          className="col-start-7 col-end-13 row-start-1 row-end-3 bg-[#D9D9D9] bg-opacity-[21%] shadow flex justify-center items-center"
        >
          <h3 className="uppercase font-bold text-[#DDC706]">pending</h3>
        </div>
        <div
          id="meeting-type"
          className="col-start-1 col-end-13 row-start-3 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Meeting Type: <b className="text-[#024458] ml-2">hybrid</b>
          </h3>
        </div>
        <div
          id="meeting-dates"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow flex p-2"
        >
          <h3 className="font-bold opacity-70 m-1">
            Start Date: <b className="text-[#024458] ml-2">5/7/2024</b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            Start Time: <b className="text-[#024458] ml-2">9am</b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            End Date: <b className="text-[#024458] ml-2">5/7/2024</b>
          </h3>
          <h3 className="font-bold opacity-70 m-1">
            End Time: <b className="text-[#024458] ml-2">10am</b>
          </h3>
        </div>
        <div
          id="meeting-title"
          className="col-start-1 col-end-13 bg-[#D9D9D9] bg-opacity-[21%] shadow p-2"
        >
          <h3 className="inline-block font-bold opacity-70 mr-2">Title: </h3>{" "}
          <span className="text-sm">INTERNAL AUDIT MEETING</span>
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
          </h3>{" "}
          <p
            ref={meetingDescriptionRef}
            className="text-md  p-2 indent-10 bg-white hidden"
          >
            Our upcoming meeting will focus on the employee promotion process.
            Key topics include the criteria for eligibility, the evaluation
            timeline, and the specific performance metrics used in assessments.
            We'll also discuss the roles of managers and HR in the
            decision-making process and outline the support and resources
            available for employees aiming for promotion. Attendees will learn
            about the different promotion tracks available within the company
            and how these align with our long-term strategic goals. We will also
            address common questions and concerns regarding the promotion
            process, ensuring transparency and clarity. This session aims to
            provide a comprehensive understanding of how promotions are managed
            and to encourage a fair and motivating work environment.
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
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
            <span className="bg-[#06ABDD] bg-opacity-[21%] p-1 px-3 m-1 rounded-[25px] inline-block font-mono">
              john@test.com
            </span>
          </div>
        </div>
        <div
          id="reschedue-approval-area"
          className="col-start-1 col-end-13 flex p-2 py-10 justify-start items-center relative"
        >
          <div className="w-[50%] flex gap-6">
            <div>
              <h3 className="font-bold opacity-70 m-1 absolute top-0">
                Change venue
              </h3>
              <form className="w-max h-max p-2 bg-[#D9D9D9]">
                <select className="bg-[#D9D9D9]">
                  <option>CVR Boardroom</option>
                  <option>CBRD Boardroom</option>
                </select>
              </form>
            </div>
            <button className="flex justify-center items-center w-max h-max p-2 bg-[#D9D9D9]">
              <span className="material-symbols-outlined opacity-70 mr-2">
                refresh
              </span>
              <h3 className="opacity-70 inline-block">Reschedule</h3>
            </button>
          </div>
          <div className="flex justify-end items-center w-[50%] font-bold text-white">
            <button className="bg-[#52AC43] w-24 h-max p-2 mr-2">ACCEPT</button>
            <button className="bg-[#D4342C] w-24 h-max p-2">REJECT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationDetails;
