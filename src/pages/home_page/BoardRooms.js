import React, { useEffect } from "react";
import BoardroomFilterPopup from "./BoardroomFilterPopup";
import BoardRoomCard from "./BoardRoomCard";
import { useDispatch, useSelector } from "react-redux";
import LoaderIndicator from "../../ components/loaders/LoaderIndicator";
import EmptyBoxMessager from "../../ components/EmptyBoxMessager";
import { fetchBoardrooms } from "../../context/boardroom/boardroomSlice";

const BoardRooms = () => {
  const boardrooms = useSelector((state) => state.boardroom.boardrooms);
  const isLoading = useSelector((state) => state.boardroom.isLoading);
  const capacityFilter = useSelector(
    (state) => state.boardroom.filter.capacityFilter
  );
  const searchedString = useSelector(
    (state) => state.boardroom.filter.searchedString
  );
  const dispatch = useDispatch();

  const fetchBoardroomdFromServer = () => {
    dispatch(fetchBoardrooms());
  };

  useEffect(() => {
    fetchBoardroomdFromServer();
  }, []);

  const filteredBoardrooms = boardrooms?.filter((boardroom) => {
    const matchesCapacity = capacityFilter
      ? boardroom?.capacity >= capacityFilter
      : true;
    const matchesSearch = searchedString
      ? boardroom?.name.toLowerCase().includes(searchedString.toLowerCase())
      : true;

    return matchesCapacity && matchesSearch;
  });

  return (
    <section id="boardrooms" className="w-full relative">
      <BoardroomFilterPopup isEnabled={boardrooms.length === 0 || isLoading} />
      {filteredBoardrooms.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No Boardrooms to display!!!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <div
            id="all-boardrooms"
            className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
          >
            {filteredBoardrooms.map((boardroom) => (
              <BoardRoomCard key={boardroom?.id} boardroom={boardroom} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BoardRooms;
