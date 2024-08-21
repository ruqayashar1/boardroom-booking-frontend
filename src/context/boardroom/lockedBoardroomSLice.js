import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, LOCKED_BOARDROOM_URL } from "../../constants";

const initialState = {
  isLoading: false,
  lockedBoardrooms: [],
  error: null,
};

const fetchLockedBoardrooms = createAsyncThunk(
  "lockedBoardroom/fetchLockedBoardrooms",
  async () => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(LOCKED_BOARDROOM_URL));
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const lockedBoardroomSlice = createSlice({
  name: "lockedBoardroom",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLockedBoardrooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLockedBoardrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lockedBoardrooms = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLockedBoardrooms.rejected, (state, action) => {
      state.isLoading = false;
      state.lockedBoardrooms = [];
      state.error = action.payload;
    });
  },
});

export default lockedBoardroomSlice.reducer;
export { fetchLockedBoardrooms };
