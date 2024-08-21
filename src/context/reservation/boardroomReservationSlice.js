import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, BOARDROOM_RESESERVATIONS_URL } from "../../constants";

const initialState = {
  isLoading: false,
  boardroomReservations: [],
  error: null,
};

const fetchBoardroomReservations = createAsyncThunk(
  "boardroomReservation/fetchBoardroomReservations",
  async (boardroomId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(BOARDROOM_RESESERVATIONS_URL(boardroomId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const boardroomReservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomReservations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomReservations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroomReservations = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardroomReservations.rejected, (state, action) => {
      state.isLoading = false;
      state.boardroomReservations = [];
      state.error = action.payload;
    });
  },
});

export default boardroomReservationSlice.reducer;
export { fetchBoardroomReservations };
