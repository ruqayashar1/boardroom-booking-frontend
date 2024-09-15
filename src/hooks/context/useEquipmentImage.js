import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipmentImage } from "../../context/upload/uploadFileSlice";

const useEquipmentImage = (equipment) => {
  const dispatch = useDispatch();

  // Selectors for image URL and loading state
  const imageUrl = useSelector(
    (state) => state.fileImage.equipmentImage[equipment?.id]
  );
  const isLoadingEquipment = useSelector(
    (state) => state.fileImage.isLoadingEquipment
  );

  // Callback for fetching the image
  const fetchImage = useCallback(
    (fileName, equipmentId) => {
      if (fileName && equipmentId) {
        dispatch(fetchEquipmentImage({ fileName, equipmentId }));
      }
    },
    [dispatch]
  );

  // Fetch the image if not already available
  useEffect(() => {
    if (!imageUrl && equipment?.picture && equipment?.id) {
      fetchImage(equipment.picture, equipment.id);
    }
  }, [fetchImage, equipment?.picture, equipment?.id, imageUrl]);

  // Return the image URL and loading state
  return { imageUrl, isLoadingEquipment };
};

export default useEquipmentImage;
