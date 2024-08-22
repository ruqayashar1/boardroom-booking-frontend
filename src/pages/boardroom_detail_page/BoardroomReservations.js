import React, { useCallback, useEffect, useState } from "react";
import ReservationsTable from "../../components/tables/ReservationsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomReservations } from "../../context/reservation/boardroomReservationSlice";
import { getCurrentSelectedBoardroomId } from "../../functions";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";

const BoardroomReservations = () => {
  const boardroomId = getCurrentSelectedBoardroomId();
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.boardroomReservation.boardroomReservations
  );
  const isLoading = useSelector(
    (state) => state.boardroomReservation.isLoading
  );
  const [filters, setFilters] = useState({
    approved: false,
    pending: false,
    declined: false,
  });

  const fetchBoardroomReservationsFromServer = useCallback(() => {
    dispatch(fetchBoardroomReservations(boardroomId));
  }, [dispatch]);

  useEffect(() => {
    fetchBoardroomReservationsFromServer();
  }, [fetchBoardroomReservationsFromServer]);

  const filteredReservations = reservations.filter((reservation) => {
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
    <>
      {filteredReservations.length === 0 && !isLoading ? (
        <EmptyBoxMessager
          displayText={"No boardroom reservations to display!"}
        />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <ReservationsTable
          reservations={filteredReservations}
          filters={filters}
          handleApprovalFilterFunc={handleApprovalFilter}
        />
      )}
    </>
  );
};

export default BoardroomReservations;
