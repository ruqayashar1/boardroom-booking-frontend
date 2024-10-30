import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomReservations } from "../../context/reservation/boardroomReservationSlice";

const useFetchBoardroomReservations = (boardroomId) => {
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.boardroomReservation.boardroomReservations
  );
  const isLoading = useSelector(
    (state) => state.boardroomReservation.isLoading
  );

  const fetchBoardroomReservationsFromServer = useCallback(() => {
    dispatch(fetchBoardroomReservations(boardroomId));
  }, [dispatch]);

  useEffect(() => {
    fetchBoardroomReservationsFromServer();
  }, [fetchBoardroomReservationsFromServer]);
  return { reservations, isLoading };
};

export default useFetchBoardroomReservations;
