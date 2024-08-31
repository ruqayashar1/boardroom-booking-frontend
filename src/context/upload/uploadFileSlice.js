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
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const fileImageSlice = createSlice({
  name: "fileImage",
  initialState: initialState,
  reducers: {},
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
    // Upload file
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
  },
});

export default fileImageSlice.reducer;
export { fetchBoardroomImage, createBoardroomImage };
