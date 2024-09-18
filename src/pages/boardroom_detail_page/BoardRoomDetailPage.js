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
  changeFromCSVToList,
  getCurrentSelectedBoardroomId,
  storeCurrentSelectedBoardroomId,
} from "../../functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomById } from "../../context/boardroom/selectedBoardroomSlice";
import BoardroomDetailImage from "./BoardroomDetailImage";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import CreateBoardroomAdmin from "./CreateBoardroomAdmin";
import CreateBoardroomEquipment from "./CreateBoardroomEquipment";
import CreateBoardroomContact from "./CreateBoardroomContact";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import useFetchBoardroomAdmin from "../../hooks/context/useFetchBoardroomAdmin";

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
        <main id="main" className="relative mb-6 px-4 md:px-8">
          <div className="flex items-center gap-5 flex-wrap">
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
          <section
            id="boardroom-basic-info"
            className="flex flex-col lg:flex-row justify-between mb-6 mt-0 gap-6"
          >
            <div id="boardroom-image" className="w-full lg:w-[49%] h-[100%]">
              <BoardroomDetailImage boardroom={boardroom} />
            </div>
            <div
              id="description-section"
              className="w-full lg:w-[49%] font-[Inter] flex flex-col justify-between relative"
            >
              <div id="top-info" className="p-3 shadow-md mb-2">
                <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
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
                  {authUserId === boardroomAdmin?.id ? (
                    <BoardroomSettings
                      toggleFuncs={toggleFuncs}
                      isRoomLocked={boardroom?.locked}
                    />
                  ) : null}
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start mb-5">
                  <div className="mr-0 sm:mr-24 mb-2 sm:mb-0">
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
                    {boardroom?.boardroomContacts?.length === 0 &&
                    (isAuthenticatedUserAdmin ||
                      authUserId === boardroomAdmin?.id) ? (
                      <button
                        onClick={() => setShowBoardroomContact(true)}
                        className="w-max h-max bg-gradient-to-tl from-[#06ABDE] to-[#a4e9e0] text-white font-semibold py-1 px-4 rounded-sm shadow-lg hover:bg-blue-600 transition duration-200 flex items-center"
                      >
                        Add Contact
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    ) : (
                      <ul className="text-sm italic">
                        {boardroom?.boardroomContacts?.map((contact) => (
                          <li key={contact?.id}>{contact?.contact}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 font-[Roboto]">
                  <p>{boardroom?.description}</p>
                </div>
              </div>
              <div
                id="bottom-info"
                className="w-full h-max bg-gradient-to-tr from-[#06ABDE] to-[#a4e9e0] rounded-sm"
              >
                <button
                  disabled={boardroom?.locked}
                  onClick={toggleReservationForm}
                  className="w-full p-2 text-center font-bold text-white rounded-sm shadow-md"
                >
                  Make Reservation
                </button>
              </div>
            </div>
          </section>
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
          <section
            id="boardroom-navigation-area"
            className="font-[Roboto] flex flex-wrap mb-10 gap-2"
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
              <h3 className="font-bold text-sm">Superviser</h3>
            </NavLink>
          </section>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default BoardRoomDetailPage;
