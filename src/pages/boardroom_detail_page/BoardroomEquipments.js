import React, { useCallback, useEffect } from "react";
import BoardroomEquipmentCard from "./BoardroomEquipmentCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomEquipments } from "../../context/equipments/equipmentSlice";
import { getCurrentSelectedBoardroomId } from "../../functions";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";

const BoardroomEquipment = () => {
  const boardromId = getCurrentSelectedBoardroomId();
  const dispatch = useDispatch();
  const boardroomEquipments = useSelector(
    (state) => state.equipment.boardroomEquipments
  );
  const isLoading = useSelector((state) => state.equipment.isLoading);

  const fetchBoardroomEquipmentsFromServer = useCallback(
    (boardromId) => {
      dispatch(fetchBoardroomEquipments(boardromId));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchBoardroomEquipmentsFromServer(boardromId);
  }, [fetchBoardroomEquipmentsFromServer, boardromId]);

  return (
    <>
      {boardroomEquipments.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No boardroom equipments to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <div id="boardroom-equipment" className="p-4">
          <div id="boardroom-equipment-filter" className=""></div>
          <div className="flex justify-center flex-wrap gap-4">
            {boardroomEquipments.map((equipment) => (
              <BoardroomEquipmentCard
                key={equipment?.id}
                equipment={equipment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BoardroomEquipment;
