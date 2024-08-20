import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, LIVE_MEETINGS_URL } from "../../constants";

const initialState = {
  isLoading: false,
  liveMeetings: [],
  error: null,
};

const fetchLiveMeetings = createAsyncThunk(
  "liveMeeting/fetchLiveMeetings",
  async () => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(LIVE_MEETINGS_URL));
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const liveMeetingSlice = createSlice({
  name: "liveMeeting",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLiveMeetings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLiveMeetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.liveMeetings = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLiveMeetings.rejected, (state, action) => {
      state.isLoading = false;
      state.liveMeetings = [];
      state.error = action.payload;
    });
  },
});

export default liveMeetingSlice.reducer;
export { fetchLiveMeetings };
