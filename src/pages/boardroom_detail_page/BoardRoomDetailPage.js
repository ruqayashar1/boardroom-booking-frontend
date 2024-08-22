import React, { useEffect, useState } from "react";
import Header from "../../ components/header/Header";
import { Bars } from "react-loader-spinner";
import boardroomImage from "../../assets/boardroom-img.jpg";
import BoardroomSettings from "./BoardroomSettings";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import AdminCreateForm from "./AdminCreateForm";
import AddEquipmentForm from "./AddEquipmentForm";
import MakeReservationForm from "./MakeReservationForm";
import LockRoomForm from "./LockRoomForm";
import UnLockRoomForm from "./UnLockRoomForm";
import PreviousPageButton from "../../ components/buttons/PreviousPageButton";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";
import {
  changeFromCSVToList,
  getCurrentSelectedBoardroomId,
  storeCurrentSelectedBoardroomId,
} from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomById } from "../../context/boardroom/selectedBoardroomSlice";
import BoardroomImage from "../home_page/BoardroomImage";
import BoardroomDetailImage from "./BoardroomDetailImage";
import LoaderIndicator from "../../ components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../ components/EmptyBoxMessager";

const BoardRoomDetailPage = () => {
  useTrackPreviousUrl();
  const dispatch = useDispatch();
  const location = useLocation();
  let { boardroomId } = location.state || {};
  storeCurrentSelectedBoardroomId(boardroomId);
  boardroomId = getCurrentSelectedBoardroomId();
  const boardroom = useSelector((state) => state.selectedBoardroom.boardroom);
  const isLoading = useSelector((state) => state.selectedBoardroom.isLoading);

  const isRoomLocked = false;
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showLockRoomForm, setShowLockRoomForm] = useState(false);
  const [showUnLockRoomForm, setShowUnLockRoomForm] = useState(false);

  const showControls = [
    setShowAdminForm,
    setShowEquipmentForm,
    setShowReservationForm,
    setShowLockRoomForm,
    setShowUnLockRoomForm,
  ];
  const manageControls = (funcName) => {
    showControls.map((func) => {
      if (func === funcName) {
        return func((prev) => !prev);
      }
      return func(false);
    });
  };
  const toggleAdminForm = () => {
    manageControls(setShowAdminForm);
  };
  const toggleEquipmentForm = () => {
    manageControls(setShowEquipmentForm);
  };

  const toggleReservationForm = () => {
    manageControls(setShowReservationForm);
  };

  const toggleLockRoomForm = () => {
    manageControls(setShowLockRoomForm);
  };

  const toggleUnLockRoomForm = () => {
    manageControls(setShowUnLockRoomForm);
  };

  const toggleFuncs = {
    toggleAdminForm: toggleAdminForm,
    toggleEquipmentForm: toggleEquipmentForm,
    toggleReservationForm: toggleReservationForm,
    toggleLockRoomForm: toggleLockRoomForm,
    toggleUnLockRoomForm: toggleUnLockRoomForm,
  };

  const fetchBoardroomByIdFromServer = () => {
    dispatch(fetchBoardroomById(boardroomId));
  };

  useEffect(() => {
    fetchBoardroomByIdFromServer();
  }, []);

  return (
    <>
      <Header />
      {boardroom === null && !isLoading ? (
        <EmptyBoxMessager displayText={"No boardroom to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <main id="main" className="relative mb-6">
          <div className="flex items-center gap-5">
            <PreviousPageButton />
            <div className="w-[100%] h-max flex justify-between my-2 ml-10 bg-[#f7f7f7] pr-4 items-center shadow-sm rounded-[0.4rem]">
              <div
                className={`w-[90%] h-[100%] bg-gradient-to-tr ${
                  boardroom?.locked
                    ? "from-[#FF5F56] to-[#FFAC81]"
                    : "from-[#06ABDE] to-[#8fdef8]"
                } bg-opacity-50 mr-2 p-2 text-white font-[Inter]`}
              >
                <h2 className="text-sm ml-4 font-bold">{boardroom?.name}</h2>
                <span className="ml-4">
                  {boardroom?.locked
                    ? "This boardroom is not available for booking"
                    : "This boardroom is available for booking"}
                </span>
              </div>
              <div className="mr-0">
                <Bars
                  height="30"
                  width="100"
                  color={
                    boardroom?.hasOngoingMeeting && !boardroom?.locked
                      ? "#00ff00"
                      : "#FF7F7F"
                  }
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass="bg-white shadow-sm"
                  visible={true}
                />
              </div>
            </div>
          </div>
          <section
            id="boardroom-basic-info"
            className="flex justify-between mb-6 mt-0"
          >
            <div id="boardroom-image" className="w-[49%] h-[50vh]">
              <BoardroomDetailImage base64String={boardroom?.picture} />
            </div>
            <div
              id="description-section"
              className="w-[49%] font-[Inter] flex flex-col justify-between relative"
            >
              <div id="top-info" className="p-3 shadow-md mb-2">
                <div className="flex justify-between  items-center mb-5">
                  <h3 className="font-semibold drop-shadow-md">
                    Capacity <b>{boardroom?.capacity}</b>
                  </h3>
                  <div
                    className={`flex justify-center ${
                      boardroom?.internetEnabled
                        ? "text-[#00ff00]"
                        : "text-red-300"
                    }`}
                  >
                    <span className="material-symbols-outlined mr-2">wifi</span>
                    <h3>Enabled</h3>
                  </div>
                  <BoardroomSettings
                    toggleFuncs={toggleFuncs}
                    isRoomLocked={isRoomLocked}
                  />
                </div>
                <div className="flex justify-center mb-5">
                  <div className="mr-24">
                    <h3 className="font-bold text-sm mb-2 opacity-50">
                      Supports
                    </h3>
                    <ul className="text-sm font-thin italic">
                      {changeFromCSVToList(
                        boardroom?.meetingTypeSupported
                      )?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-2 opacity-50">
                      Phone Extension
                    </h3>
                    <ul className="text-sm italic">
                      {boardroom?.boardroomContacts?.map((contact) => (
                        <li key={contact?.id}>{contact?.contact}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 font-[Roboto]">
                  <p>{boardroom?.description}</p>
                </div>
              </div>
              <div
                id="bottom-info"
                className="w-[100%] h-max bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0] rounded-sm"
              >
                <button
                  disabled={boardroom?.locked}
                  onClick={toggleReservationForm}
                  className="w-[100%] p-2 text-center font-bold text-white rounded-sm shadow-md"
                >
                  Make Reservation
                </button>
              </div>
            </div>
          </section>
          {showAdminForm ? (
            <AdminCreateForm toggleAdminForm={toggleAdminForm} />
          ) : null}
          {showEquipmentForm ? (
            <AddEquipmentForm toggleEquipmentForm={toggleEquipmentForm} />
          ) : null}
          {showReservationForm ? (
            <MakeReservationForm
              toggleReservationForm={toggleReservationForm}
              boardroom={"CBRD Boardroom"}
            />
          ) : null}
          {showLockRoomForm ? (
            <LockRoomForm toggleLockRoomForm={toggleLockRoomForm} />
          ) : null}
          {showUnLockRoomForm ? (
            <UnLockRoomForm toggleUnLockRoomForm={toggleUnLockRoomForm} />
          ) : null}
          <section
            id="boardroom-navigation-area"
            className="font-[Roboto] flex mb-10"
          >
            <NavLink
              to=""
              className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
            >
              <h3 className="font-bold text-sm">Reservations</h3>
            </NavLink>
            {/* <NavLink
            to="archived-reservations"
            className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
          >
            <h3 className="font-bold text-sm">Archived Reservations</h3>
          </NavLink> */}
            <NavLink
              to="equipments"
              className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
            >
              <h3 className="font-bold text-sm">Equipment</h3>
            </NavLink>
            <NavLink
              to="admin-info"
              className="w-max h-8 bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9] bg-[#d9d9d9] bg-opacity-50 flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer mr-4"
            >
              <h3 className="font-bold text-sm">Admin Info</h3>
            </NavLink>
          </section>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default BoardRoomDetailPage;
