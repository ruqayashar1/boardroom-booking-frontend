import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  FETCH_FILE_BY_NAME_URL,
  UPLOAD_IMAGE_URL,
} from "../../constants";
import { blobToBase64 } from "../../functions";

const initialState = {
  isLoading: false,
  isLoadingEquipment: false,
  isUploading: false,
  boardroomImage: {},
  equipmentImage: {},
  currentCreatedFileName: "",
  error: null,
};

const fetchBoardroomImage = createAsyncThunk(
  "fileImage/fetchBoardroomImage",
  async ({ fileName, boardroomId }) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_FILE_BY_NAME_URL(fileName)),
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json", // Adjust based on your request type
          },
        }
      );
      const mimeType = resp.headers["content-type"];
      const base64 = await blobToBase64(resp.data);
      const imageUrl = `data:${mimeType};base64,${base64}`;
      return { boardroomId: boardroomId, imageUrl: imageUrl };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const createBoardroomImage = createAsyncThunk(
  "fileImage/createBoardroomImage",
  async (fileData) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(UPLOAD_IMAGE_URL),
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const createEquipmentImage = createAsyncThunk(
  "fileImage/createEquipmentImage",
  async (fileData) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(UPLOAD_IMAGE_URL),
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const fetchEquipmentImage = createAsyncThunk(
  "fileImage/fetchEquipmentImage",
  async ({ fileName, equipmentId }) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_FILE_BY_NAME_URL(fileName)),
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json", // Adjust based on your request type
          },
        }
      );
      const mimeType = resp.headers["content-type"];
      const base64 = await blobToBase64(resp.data);
      const imageUrl = `data:${mimeType};base64,${base64}`;
      return { equipmentId: equipmentId, imageUrl: imageUrl };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const fileImageSlice = createSlice({
  name: "fileImage",
  initialState: initialState,
  reducers: {
    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch boardroom image
    builder.addCase(fetchBoardroomImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroomImage = {
        ...state.boardroomImage,
        [action.payload?.boardroomId]: action.payload?.imageUrl,
      };
      state.error = null;
    });
    builder.addCase(fetchBoardroomImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Fetch equipment image
    builder.addCase(fetchEquipmentImage.pending, (state) => {
      state.isLoadingEquipment = true;
    });
    builder.addCase(fetchEquipmentImage.fulfilled, (state, action) => {
      state.isLoadingEquipment = false;
      state.equipmentImage = {
        ...state.equipmentImage,
        [action.payload?.equipmentId]: action.payload?.imageUrl,
      };
      state.error = null;
    });
    builder.addCase(fetchEquipmentImage.rejected, (state, action) => {
      state.isLoadingEquipment = false;
      state.error = action.payload;
    });
    // Upload boardroom file
    builder.addCase(createBoardroomImage.pending, (state) => {
      state.isUploading = true;
    });
    builder.addCase(createBoardroomImage.fulfilled, (state, action) => {
      state.isUploading = false;
      state.currentCreatedFileName = action.payload;
      state.error = null;
    });
    builder.addCase(createBoardroomImage.rejected, (state, action) => {
      state.isUploading = false;
      state.error = action.payload;
    });

    // Upload boardroom file
    builder.addCase(createEquipmentImage.pending, (state) => {
      state.isUploading = true;
    });
    builder.addCase(createEquipmentImage.fulfilled, (state, action) => {
      state.isUploading = false;
      state.currentCreatedFileName = action.payload;
      state.error = null;
    });
    builder.addCase(createEquipmentImage.rejected, (state, action) => {
      state.isUploading = false;
      state.error = action.payload;
    });
  },
});

export default fileImageSlice.reducer;
export const { setIsUploading } = fileImageSlice.actions;
export {
  fetchBoardroomImage,
  createBoardroomImage,
  fetchEquipmentImage,
  createEquipmentImage,
};
