import React from "react";
import { Bars } from "react-loader-spinner";
import { motion } from "framer-motion";

import { NavLink } from "react-router-dom";
import BoardroomImage from "./BoardroomImage";
import useBoardroomImage from "../../hooks/context/useBoardroomImage";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BoardRoomCard = ({ boardroom }) => {
  const { imageUrl, isLoading } = useBoardroomImage(boardroom);
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
        <BoardroomImage imageUrl={imageUrl} isLoading={isLoading} />
        <div className="mx-2 my-6">
          <span className="block font-bold w-full text-sm">
            {boardroom?.name}
          </span>
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
            {boardroom?.hasOngoingMeeting && !boardroom?.locked ? (
              <Bars
                height="30"
                width="30"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : null}
          </div>
        </div>
        <div className="capacity-badge">
          <span>{`Capacity ${boardroom?.capacity}`}</span>
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

export default BoardRoomCard;
