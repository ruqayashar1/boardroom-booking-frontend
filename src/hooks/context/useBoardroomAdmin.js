import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomAdmin } from "../../context/boardroom/boardroomAdminSlice";

const useBoardroomAdmin = (boardroomId) => {
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
  }, []);

  return { boardroomAdmin, isLoading };
};

export default useBoardroomAdmin;
