import { useState } from "react";
import { changeFromCSVToList } from "../../functions";
import BoardroomDescription from "./BoardroomDescription";

const BoardroomDetails = ({
  boardroom,
  toggleReservationForm,
  isAuthenticatedUserAdmin,
  authUserId,
  boardroomAdmin,
  setShowBoardroomContact,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className="w-max relative ">
        {/* Trigger to show the boardroom details */}
        <span
          className={`w-full font-bold text-sm sm:w-auto h-8 p-2 bg-gradient-to-tr ${
            showDetails
              ? "from-[#ddbe96] to-[#e29696]"
              : "from-[#eef5f7] to-[#d9d9d9]"
          } flex justify-center items-center shadow-md px-4 opacity-70 hover:opacity-100 cursor-pointer`}
          onClick={toggleDetails}
        >
          Boardroom Details
        </span>
      </div>

      {/* Boardroom Details (shown when state is true) */}
      {showDetails && (
        <div
          id="description-section"
          className="absolute top-16 left-0 w-full lg:w-full font-[Inter] bg-gray-50 shadow p-6 z-20"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <div id="top-info" className="p-3 shadow mb-2 bg-white">
            <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
              <h3 className="font-semibold drop-shadow-md">
                Capacity <b>{boardroom?.capacity}</b>
              </h3>
              <div
                className={`flex justify-center ${
                  boardroom?.internetEnabled ? "text-[#00ff00]" : "text-red-300"
                }`}
              >
                <span className="material-symbols-outlined mr-2">wifi</span>
                <h3>Enabled</h3>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start mb-5">
              <div className="mr-0 sm:mr-24 mb-2 sm:mb-0">
                <h3 className="font-bold text-sm mb-2 opacity-50">Supports</h3>
                <ul className="text-sm font-thin italic">
                  {changeFromCSVToList(boardroom?.meetingTypeSupported)?.map(
                    (item) => (
                      <li key={item}>{item}</li>
                    )
                  )}
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

            <BoardroomDescription description={boardroom?.description} />
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
      )}
    </>
  );
};

export default BoardroomDetails;
