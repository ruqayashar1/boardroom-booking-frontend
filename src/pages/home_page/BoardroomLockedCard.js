import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import BoardroomImage from "./BoardroomImage";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { fetchLockedBoardroomMessageById } from "../../context/boardroom/lockedBoardroomMessageSlice";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BoardroomLockedCard = ({ boardroom }) => {
  const dispatch = useDispatch();
  const lockedMessage = useSelector(
    (state) =>
      state.lockedBoardroomMessage.lockedBoardroomMessage?.[boardroom?.id]
  );
  const isLoading = useSelector(
    (state) => state.lockedBoardroomMessage.isLoading
  );

  const fetchBoardroomLockMessageFromServer = useCallback(
    (id) => {
      dispatch(fetchLockedBoardroomMessageById(id));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchBoardroomLockMessageFromServer(boardroom?.id);
  }, [fetchBoardroomLockMessageFromServer, boardroom?.id]);

  return (
    <NavLink
      to={`/boardrooms/${boardroom?.tag}`}
      className="boardroom-card cursor-pointer"
      state={{ boardroomId: boardroom?.id }}
    >
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: boardroom?.id * 0.1 }}
      >
        <BoardroomImage base64String={boardroom?.picture} />
        <div className="mx-2 my-6">
          <span className="block font-bold w-full text-sm">
            {boardroom?.name}
          </span>
          {isLoading ? (
            <ColorRing
              visible={true}
              height="60"
              width="60"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <span className="block w-full text-sm bg-red-100 p-2 mt-2">
              {lockedMessage}
            </span>
          )}
          <div className=" w-[50%] flex mt-2 justify-between items-center">
            <div className="flex mt-2">
              {boardroom?.internetEnabled ? (
                <span className="material-symbols-outlined block text-green-500 text-sm mr-2">
                  wifi
                </span>
              ) : (
                <span className="material-symbols-outlined block text-red-500 text-sm mr-2">
                  wifi
                </span>
              )}
              <span className="block text-gray-500 text-sm">Wifi</span>
            </div>
          </div>
        </div>
        <div className="capacity-badge">
          <span> {`Capacity ${boardroom?.capacity}`} </span>
        </div>
        {boardroom?.locked ? (
          <span className="boardroom-not-available">Locked</span>
        ) : (
          <span className="boardroom-available">Available</span>
        )}
      </motion.div>
    </NavLink>
  );
};

export default BoardroomLockedCard;
