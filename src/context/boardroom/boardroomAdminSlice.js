import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  CHANGE_BOARDROOM_ADMIN_URL,
  FETCH_BOARDROOM_ADMINISTRATOR_URL,
} from "../../constants";
import { toast } from "react-toastify";

const initialState = {
  isSaving: false,
  isLoading: false,
  boardroomAdmin: null,
  error: null,
};

const fetchBoardroomAdmin = createAsyncThunk(
  "boardromAdmin/fetchBoardroomAdmin",
  async (boardromId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_BOARDROOM_ADMINISTRATOR_URL(boardromId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const changeBoardroomAdmin = createAsyncThunk(
  "boardromAdmin/changeBoardroomAdmin",
  async ({ boardromId, admin }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(CHANGE_BOARDROOM_ADMIN_URL(boardromId)),
        admin
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const boardroomAdminSlice = createSlice({
  name: "boardroomAdmin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroomAdmin = action.payload;
    });
    builder.addCase(fetchBoardroomAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Change boardroom admin
    builder.addCase(changeBoardroomAdmin.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(changeBoardroomAdmin.fulfilled, (state, action) => {
      state.isSaving = false;
      state.boardroomAdmin = action.payload;
      toast.success("Boardroom admin changed successfully");
    });
    builder.addCase(changeBoardroomAdmin.rejected, (state, action) => {
      state.isSaving = false;
      state.error = action.payload;
    });
  },
});

export default boardroomAdminSlice.reducer;
export { fetchBoardroomAdmin, changeBoardroomAdmin };
