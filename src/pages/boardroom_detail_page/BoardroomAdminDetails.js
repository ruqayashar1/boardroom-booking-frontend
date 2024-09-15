import React from "react";
import BoardroomAdminInfo from "./BoardroomAdminInfo";
import { getCurrentSelectedBoardroomId } from "../../functions";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import useBoardroomAdmin from "../../hooks/context/useBoardroomAdmin";

const BoardroomAdminDetails = () => {
  const boardroomId = getCurrentSelectedBoardroomId();
  const { boardroomAdmin, isLoading } = useBoardroomAdmin(boardroomId);
  return (
    <>
      {boardroomAdmin === null && !isLoading ? (
        <EmptyBoxMessager displayText={"No record to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <BoardroomAdminInfo boardroomAdmin={boardroomAdmin} />
      )}
    </>
  );
};

export default BoardroomAdminDetails;
