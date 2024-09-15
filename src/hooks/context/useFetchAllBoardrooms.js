import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardrooms } from "../../context/boardroom/boardroomSlice";

const useFetchAllBoardrooms = () => {
  const dispatch = useDispatch();
  const boardrooms = useSelector((state) => state.boardroom.boardrooms);
  const isLoading = useSelector((state) => state.boardroom.isLoading);
  const fetchBoardroomsFromServer = useCallback(() => {
    dispatch(fetchBoardrooms());
  }, []);
  useEffect(() => {
    if (boardrooms.length === 0) {
      fetchBoardroomsFromServer();
    }
  }, []);

  return { boardrooms, isLoading };
};

export default useFetchAllBoardrooms;
