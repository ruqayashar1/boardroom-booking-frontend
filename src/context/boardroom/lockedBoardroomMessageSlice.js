import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, LOCKED_BOARDROOM_MESSAGE_URL } from "../../constants";

const initialState = {
  isLoading: false,
  lockedBoardroomMessage: {},
  error: null,
};

const fetchLockedBoardroomMessageById = createAsyncThunk(
  "lockedBoardroomMessage/fetchLockedBoardroomMessageById",
  async (boardroomId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(LOCKED_BOARDROOM_MESSAGE_URL(boardroomId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

const lockedBoardroomMessageSlice = createSlice({
  name: "lockedBoardroomMessage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLockedBoardroomMessageById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchLockedBoardroomMessageById.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.lockedBoardroomMessage[action.payload?.boardroomId] =
          action.payload?.givenReason;
        state.error = null;
      }
    );
    builder.addCase(
      fetchLockedBoardroomMessageById.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default lockedBoardroomMessageSlice.reducer;
export { fetchLockedBoardroomMessageById };
