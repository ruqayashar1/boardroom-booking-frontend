import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { Bars } from "react-loader-spinner";
import BoardroomSettings from "./BoardroomSettings";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import MakeReservationForm from "./MakeReservationForm";
import LockRoom from "./LockRoom";
import UnLockRoom from "./UnLockRoom";
import useTrackPreviousUrl from "../../hooks/useTrackPreviousUrl";
import {
  getCurrentSelectedBoardroomId,
  storeCurrentSelectedBoardroomId,
} from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomById } from "../../context/boardroom/selectedBoardroomSlice";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import CreateBoardroomAdmin from "./CreateBoardroomAdmin";
import CreateBoardroomEquipment from "./CreateBoardroomEquipment";
import CreateBoardroomContact from "./CreateBoardroomContact";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import useFetchBoardroomAdmin from "../../hooks/context/useFetchBoardroomAdmin";
import BoardroomDetails from "./BoardroomDetails";

const BoardRoomDetailPage = () => {
  useTrackPreviousUrl();
  const { isAuthenticatedUserAdmin, authUserId } = useAuthenticatedUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let { boardroomId } = location.state || {};
  storeCurrentSelectedBoardroomId(boardroomId);
  boardroomId = getCurrentSelectedBoardroomId();
  const { boardroomAdmin } = useFetchBoardroomAdmin(boardroomId);
  const boardroom = useSelector((state) => state.selectedBoardroom.boardroom);
  const isLoading = useSelector((state) => state.selectedBoardroom.isLoading);

  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showLockRoomForm, setShowLockRoomForm] = useState(false);
  const [showUnLockRoomForm, setShowUnLockRoomForm] = useState(false);
  const [showBoardroomContact, setShowBoardroomContact] = useState(false);

  const showControls = [
    setShowAdminForm,
    setShowEquipmentForm,
    setShowReservationForm,
    setShowLockRoomForm,
    setShowUnLockRoomForm,
    setShowBoardroomContact,
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

  const toggleBoardroomContact = () => {
    manageControls(setShowBoardroomContact);
  };

  const navigateToUpdateForm = () => {
    navigate("/add-boardroom", { state: boardroom });
  };

  const toggleFuncs = {
    toggleAdminForm: toggleAdminForm,
    toggleEquipmentForm: toggleEquipmentForm,
    toggleReservationForm: toggleReservationForm,
    toggleLockRoomForm: toggleLockRoomForm,
    toggleUnLockRoomForm: toggleUnLockRoomForm,
    navigateToUpdateForm: navigateToUpdateForm,
    toggleBoardroomContact: toggleBoardroomContact,
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
          <div className="flex items-center gap-5 flex-wrap mb-4 mt-2">
            <div className="flex-1 h-max flex justify-between my-2 bg-[#f7f7f7] pr-4 items-center shadow-sm rounded-[0.4rem]">
              <div
                className={`w-full sm:w-[80%] h-full bg-gradient-to-tr ${
                  boardroom?.locked
                    ? "from-[#FF5F56] to-[#FFAC81]"
                    : "from-[#06ABDE] to-[#8fdef8]"
                } bg-opacity-50 p-2 text-white font-[Inter]`}
              >
                <h2 className="text-sm ml-4 font-bold">{boardroom?.name}</h2>
                <span className="ml-4">
                  {boardroom?.locked
                    ? "This boardroom is not available for booking"
                    : "This boardroom is available for booking"}
                </span>
              </div>
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
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

          {showAdminForm ? (
            <CreateBoardroomAdmin
              toggleAdminForm={toggleAdminForm}
              boardroom={boardroom}
            />
          ) : null}
          {showEquipmentForm ? (
            <CreateBoardroomEquipment
              toggleEquipmentForm={toggleEquipmentForm}
              boardroom={boardroom}
            />
          ) : null}
          {showReservationForm ? (
            <MakeReservationForm
              toggleReservationForm={toggleReservationForm}
              boardroom={boardroom}
            />
          ) : null}
          {showLockRoomForm ? (
            <LockRoom
              toggleLockRoomForm={toggleLockRoomForm}
              boardroom={boardroom}
            />
          ) : null}
          {showUnLockRoomForm ? (
            <UnLockRoom
              toggleUnLockRoomForm={toggleUnLockRoomForm}
              boardroom={boardroom}
            />
          ) : null}
          {showBoardroomContact ? (
            <CreateBoardroomContact
              toggleBoardroomContact={toggleBoardroomContact}
              boardroom={boardroom}
            />
          ) : null}
          <section className="w-full relative mb-6">
            {/* Adjust for smaller screens using responsive utilities */}
            <div className="w-full lg:w-[50%] md:absolute md:right-0 flex flex-col lg:flex-row gap-4 justify-between p-4 lg:p-0">
              <BoardroomDetails
                boardroom={boardroom}
                toggleReservationForm={toggleReservationForm}
                isAuthenticatedUserAdmin={isAuthenticatedUserAdmin}
                authUserId={authUserId}
                boardroomAdmin={boardroomAdmin}
                setShowBoardroomContact={setShowBoardroomContact}
              />
              <BoardroomSettings
                toggleFuncs={toggleFuncs}
                boardroomAdmin={boardroomAdmin}
                isRoomLocked={boardroom?.locked}
                boardroom={boardroom}
              />
            </div>

            {/* Navigation Area */}
            <div
              id="boardroom-navigation-area"
              className="font-[Roboto] flex flex-wrap gap-2 mb-10 w-full lg:w-[50%] p-4 lg:p-0"
            >
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `w-full sm:w-auto h-8 ${
                    isActive
                      ? "bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0]"
                      : "bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9]"
                  } flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer`
                }
              >
                <h3 className="font-bold text-sm">Calendar</h3>
              </NavLink>

              <NavLink
                to="reservations"
                end
                className={({ isActive }) =>
                  `w-full sm:w-auto h-8 ${
                    isActive
                      ? "bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0]"
                      : "bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9]"
                  } flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer`
                }
              >
                <h3 className="font-bold text-sm">Reservations</h3>
              </NavLink>

              {isAuthenticatedUserAdmin && (
                <NavLink
                  to="equipments"
                  className={({ isActive }) =>
                    `w-full sm:w-auto h-8 ${
                      isActive
                        ? "bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0]"
                        : "bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9]"
                    } flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer`
                  }
                >
                  <h3 className="font-bold text-sm">Equipment</h3>
                </NavLink>
              )}

              <NavLink
                to="admin-info"
                className={({ isActive }) =>
                  `w-full sm:w-auto h-8 ${
                    isActive
                      ? "bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0]"
                      : "bg-gradient-to-tr from-[#eef5f7] to-[#d9d9d9]"
                  } flex justify-center items-center p-2 shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer`
                }
              >
                <h3 className="font-bold text-sm">Supervisor</h3>
              </NavLink>
            </div>
          </section>

          <Outlet context={{ toggleReservationForm, boardroom }} />
        </main>
      )}
    </>
  );
};

export default BoardRoomDetailPage;
