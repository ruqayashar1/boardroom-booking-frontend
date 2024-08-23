import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_BOARDROOM_BY_ID_URL } from "../../constants";

const initialState = {
  isLoading: false,
  boardroom: null,
  error: null,
};

const fetchBoardroomById = createAsyncThunk(
  "selectedBoardrom/fetchBoardroomById",
  async (boardroomId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_BOARDROOM_BY_ID_URL(boardroomId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const selectedBoardroomSlice = createSlice({
  name: "selectedBoardroom",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroom = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardroomById.rejected, (state, action) => {
      state.isLoading = false;
      state.boardroom = [];
      state.error = action.payload;
    });
  },
});

export default selectedBoardroomSlice.reducer;
export { fetchBoardroomById };
