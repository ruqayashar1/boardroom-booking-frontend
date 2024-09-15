import React from "react";
import Header from "../../components/header/Header";
import PreviousPageButton from "../../components/buttons/PreviousPageButton";
import SystemAdministratorSearch from "./SystemAdministratorSearch";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";
import useKemriEmployees from "../../hooks/context/useKemriEmployees";

const SystemAdminsPage = () => {
  useTrackPreviousUrl();
  const kemriEmployees = useKemriEmployees();

  return (
    <>
      <Header />
      <div className="flex items-center">
        <PreviousPageButton />
        <div className="w-full h-8 bg-[#06ABDD] text-white font-bold px-2 font-[Roboto] shadow-lg my-4 ml-10">
          <h4 className="font-bold m-1">SYSTEM ADMINISTRATORS</h4>
        </div>
      </div>
      <div className="shadow bg-gray-100 p-4 w-3/4 mx-auto">
        <SystemAdministratorSearch kemriEmployees={kemriEmployees} />
      </div>
    </>
  );
};

export default SystemAdminsPage;
