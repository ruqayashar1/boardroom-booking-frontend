import React, { useCallback, useEffect } from "react";
import BoardroomAdminInfo from "./BoardroomAdminInfo";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSelectedBoardroomId } from "../../functions";
import { fetchBoardroomAdmin } from "../../context/boardroom/boardroomAdminSlice";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";

const BoardroomAdminDetails = () => {
  const boardroomId = getCurrentSelectedBoardroomId();
  const dispatch = useDispatch();
  const boardroomAdmin = useSelector(
    (state) => state.boardroomAdmin.boardroomAdmin
  );
  const isLoading = useSelector((state) => state.boardroomAdmin.isLoading);
  const fetchBoardroomAdminFromServer = useCallback(
    (boardroomId) => {
      dispatch(fetchBoardroomAdmin(boardroomId));
    },
    [dispatch]
  );
  useEffect(() => {
    fetchBoardroomAdminFromServer(boardroomId);
  }, [fetchBoardroomAdminFromServer]);
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
