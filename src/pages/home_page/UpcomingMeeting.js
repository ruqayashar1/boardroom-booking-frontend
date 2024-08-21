import React, { useCallback, useEffect, useState } from "react";
import ReservationsTable from "../../ components/tables/ReservationsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMeetings } from "../../context/reservation/upcomingMeetingSlice";
import EmptyBoxMessager from "../../ components/EmptyBoxMessager";
import LoaderIndicator from "../../ components/loaders/LoaderIndicator";

const UpcomingMeeting = () => {
  const dispatch = useDispatch();
  const upcomingMeetings = useSelector(
    (state) => state.upcomingMeeting.upcomingMeetings
  );
  const isLoading = useSelector((state) => state.upcomingMeeting.isLoading);
  const [filters, setFilters] = useState({
    approved: false,
    pending: false,
    declined: false,
  });

  const fetchUpcomingMeetingsFromServer = useCallback(() => {
    dispatch(fetchUpcomingMeetings());
  }, [dispatch]);

  useEffect(() => {
    fetchUpcomingMeetingsFromServer();
  }, [fetchUpcomingMeetingsFromServer]);

  const filteredReservations = upcomingMeetings.filter((reservation) => {
    const { approvalStatus } = reservation;

    // Check if any filter is applied
    const isAnyFilterApplied =
      filters.approved || filters.pending || filters.declined;

    // If no filter is applied, include all items
    if (!isAnyFilterApplied) {
      return true;
    }

    // If filters are applied, filter based on the specific filter
    const a = filters.approved && approvalStatus === "APPROVED";
    const p = filters.pending && approvalStatus === "PENDING";
    const c = filters.declined && approvalStatus === "DECLINED";

    return a || p || c;
  });

  const handleApprovalFilter = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };
  return (
    <div id="upcoming-meeting" className="p-2">
      <span className="block w-max uppercase mb-4 tracking-wide font-[Roboto] bg-gray-100 shadow-sm p-2">
        Upcoming Meetings
      </span>
      {filteredReservations.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No upcoming meetings to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <ReservationsTable
          reservations={filteredReservations}
          filters={filters}
          handleApprovalFilterFunc={handleApprovalFilter}
        />
      )}
    </div>
  );
};

export default UpcomingMeeting;
