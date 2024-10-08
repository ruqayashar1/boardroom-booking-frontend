import React from "react";
import { motion } from "framer-motion";
import BoardroomFilterPopup from "./BoardroomFilterPopup";
import BoardRoomCard from "./BoardRoomCard";
import { useSelector } from "react-redux";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import useFetchAllBoardrooms from "../../hooks/context/useFetchAllBoardrooms";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

const BoardRooms = () => {
  const { boardrooms, isLoading } = useFetchAllBoardrooms();
  const capacityFilter = useSelector(
    (state) => state.boardroom.filter.capacityFilter
  );
  const overlapedBoardrooms = useSelector(
    (state) => state.boardroom.overlapedBoardrooms
  );
  const searchedString = useSelector(
    (state) => state.boardroom.filter.searchedString
  );

  const filteredBoardrooms = boardrooms
    ?.filter((boardroom) => {
      const matchesCapacity = capacityFilter
        ? boardroom?.capacity >= capacityFilter
        : true;
      const matchesSearch = searchedString
        ? boardroom?.name.toLowerCase().includes(searchedString.toLowerCase())
        : true;

      return matchesCapacity && matchesSearch;
    })
    .filter((boardroom) =>
      overlapedBoardrooms.length !== 0
        ? !overlapedBoardrooms.find((room) => room.id === boardroom.id)
        : true
    );

  return (
    <section id="boardrooms" className="w-full relative">
      <BoardroomFilterPopup isEnabled={boardrooms.length === 0 || isLoading} />
      {filteredBoardrooms.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No Boardrooms to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <motion.div
            id="all-boardrooms"
            className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.5 }}
          >
            {filteredBoardrooms.map((boardroom) => (
              <BoardRoomCard key={boardroom?.id} boardroom={boardroom} />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
};

export default BoardRooms;
