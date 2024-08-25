import React, { useCallback, useEffect } from "react";
import Header from "../../components/header/Header";
import ReservationDetails from "./ReservationDetails";
import PreviousPageButton from "../../components/buttons/PreviousPageButton";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";
import { useDispatch, useSelector } from "react-redux";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import { fetchReservationById } from "../../context/reservation/reservationDetailSlice";
import { getCurrentSelectedReservationId } from "../../functions";

const ReservationDetailPage = () => {
  useTrackPreviousUrl();
  const reservationId = getCurrentSelectedReservationId();
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state) => state.selectedReservation.reservation
  );
  const isLoading = useSelector((state) => state.selectedReservation.isLoading);

  const fetchReservationFromServer = useCallback(
    (reservationId) => {
      dispatch(fetchReservationById(reservationId));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchReservationFromServer(reservationId);
  }, [fetchReservationFromServer, reservationId]);

  return (
    <>
      <Header />
      <main className="relative">
        <div className="flex items-center">
          <PreviousPageButton />
          <div className="w-full h-8 bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow my-4 ml-10">
            <h4 className="font-bold m-1">INTERNAL AUDIT MEETING</h4>
          </div>
        </div>
        {reservation === null && !isLoading ? (
          <EmptyBoxMessager displayText={"No reservation to display!"} />
        ) : isLoading ? (
          <LoaderIndicator />
        ) : (
          <ReservationDetails reservation={reservation} />
        )}
      </main>
    </>
  );
};

export default ReservationDetailPage;
