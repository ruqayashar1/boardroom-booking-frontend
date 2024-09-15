import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import BoardroomImage from "../../assets/boardroom-img.jpg";
import BoardroomLockedCard from "./BoardroomLockedCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLockedBoardrooms } from "../../context/boardroom/lockedBoardroomSLice";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

const LockedRooms = () => {
  const dispatch = useDispatch();
  const lockedRooms = useSelector(
    (state) => state.lockedBoardroom.lockedBoardrooms
  );
  const isLoading = useSelector((state) => state.lockedBoardroom.isLoading);

  const getAllLockedBoardroomsFromServer = useCallback(() => {
    dispatch(fetchLockedBoardrooms());
  }, [dispatch]);

  useEffect(() => {
    getAllLockedBoardroomsFromServer();
  }, [getAllLockedBoardroomsFromServer]);

  return (
    <>
      {lockedRooms.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No locked boardroom to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <motion.div
          id="locked-rooms"
          className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 0.5 }}
        >
          {lockedRooms.map((boardroom) => (
            <BoardroomLockedCard
              key={boardroom?.id}
              boardroomImage={BoardroomImage}
              locked={true}
              boardroom={boardroom}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default LockedRooms;
