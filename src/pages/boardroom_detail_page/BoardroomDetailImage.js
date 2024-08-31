import React, { useCallback, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardroomImage } from "../../context/upload/uploadFileSlice";

const BoardroomDetailImage = ({ boardroom }) => {
  const dispatch = useDispatch();
  const imageUrl = useSelector(
    (state) => state.fileImage.boardroomImage[boardroom?.id]
  );
  const isLoading = useSelector((state) => state.fileImage.isLoading);

  const fetchBoardroomImageFromServer = useCallback(
    (fileName, boardroomId) => {
      dispatch(fetchBoardroomImage({ fileName, boardroomId }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!imageUrl) {
      fetchBoardroomImageFromServer(boardroom?.picture, boardroom?.id);
    }
  }, [fetchBoardroomImageFromServer, boardroom?.picture, boardroom?.id]);
  return (
    <>
      {isLoading ? (
        <div className="h-[50vh] flex justify-center items-center bg-gray-200">
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="boardroom"
          className="w-[100%] h-[100%] opacity-80 rounded-sm shadow-lg brightness-90"
        />
      )}
    </>
  );
};

export default BoardroomDetailImage;
