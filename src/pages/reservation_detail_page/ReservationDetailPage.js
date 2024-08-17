import React from "react";
import Header from "../../ components/header/Header";
import ReservationDetails from "./ReservationDetails";
import PreviousPageButton from "../../ components/buttons/PreviousPageButton";
import ReservationForm from "../../ components/forms/ReservationForm";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";

const ReservationDetailPage = () => {
  useTrackPreviousUrl();
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
        <ReservationDetails />
      </main>
    </>
  );
};

export default ReservationDetailPage;
