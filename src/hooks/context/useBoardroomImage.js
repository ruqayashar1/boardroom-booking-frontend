import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomImage } from "../../context/upload/uploadFileSlice";

const useBoardroomImage = (boardroom) => {
  const dispatch = useDispatch();

  // Selectors for image URL and loading state
  const imageUrl = useSelector(
    (state) => state.fileImage.boardroomImage[boardroom?.id]
  );
  const isLoading = useSelector((state) => state.fileImage.isLoading);

  // Callback for fetching the image
  const fetchImage = useCallback(
    (fileName, boardroomId) => {
      if (fileName && boardroomId) {
        dispatch(fetchBoardroomImage({ fileName, boardroomId }));
      }
    },
    [dispatch]
  );

  // Fetch the image if not already available
  useEffect(() => {
    if (!imageUrl && boardroom?.picture && boardroom?.id) {
      fetchImage(boardroom.picture, boardroom.id);
    }
  }, [fetchImage, boardroom?.picture, boardroom?.id, imageUrl]);

  // Return the image URL and loading state
  return { imageUrl, isLoading };
};

export default useBoardroomImage;
