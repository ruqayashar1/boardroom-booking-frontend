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
      <main className="relative mb-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <PreviousPageButton />
          <div className="w-full md:w-auto h-max bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow my-4 md:ml-10">
            <h4 className="font-bold m-1 text-sm md:text-base">
              {reservation?.meetingTitle}
            </h4>
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
