import React, { useState } from "react";
import ReservationsTable from "../../components/tables/ReservationsTable";
import { getCurrentSelectedBoardroomId } from "../../functions";
import useFetchBoardroomReservations from "../../hooks/context/useFetchBoardroomReservations";
import useFetchBoardroomAdmin from "../../hooks/context/useFetchBoardroomAdmin";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";

const BoardroomReservations = () => {
  const boardroomId = getCurrentSelectedBoardroomId();
  const { boardroomAdmin } = useFetchBoardroomAdmin(boardroomId);
  const { authUserId, isAuthenticatedUserAdmin } = useAuthenticatedUser();
  const [filters, setFilters] = useState({
    approved: false,
    pending: false,
    declined: false,
  });

  const { reservations, isLoading } =
    useFetchBoardroomReservations(boardroomId);

  const userReservations =
    reservations.length !== 0 && boardroomAdmin !== null
      ? reservations.filter((reservation) => {
          if (isAuthenticatedUserAdmin || authUserId === boardroomAdmin?.id) {
            return true;
          } else {
            return reservation?.userId === authUserId;
          }
        })
      : [];

  const filteredReservations = userReservations.filter((reservation) => {
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
    <ReservationsTable
      isLoading={isLoading}
      reservations={filteredReservations}
      filters={filters}
      handleApprovalFilterFunc={handleApprovalFilter}
    />
  );
};

export default BoardroomReservations;
