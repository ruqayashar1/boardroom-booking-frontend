import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_BOARDROOM_ADMINISTRATOR_URL } from "../../constants";

const initialState = {
  isLoading: false,
  boardroomAdmin: null,
  error: null,
};

const fetchBoardroomAdmin = createAsyncThunk(
  "boardrom/fetchBoardroomAdmin",
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
  },
});

export default boardroomAdminSlice.reducer;
export { fetchBoardroomAdmin };
