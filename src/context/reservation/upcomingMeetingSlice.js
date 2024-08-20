import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, UPCOMING_RESERVATIONS } from "../../constants";

const initialState = {
  isLoading: false,
  upcomingMeetings: [],
  error: null,
};

const fetchUpcomingMeetings = createAsyncThunk(
  "upcomingMeeting/fetchUpcomingMeetings",
  async () => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(UPCOMING_RESERVATIONS));
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const upcomingMeetingSlice = createSlice({
  name: "upcomingMeeting",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingMeetings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpcomingMeetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.upcomingMeetings = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUpcomingMeetings.rejected, (state, action) => {
      state.isLoading = false;
      state.upcomingMeetings = [];
      state.error = action.payload;
    });
  },
});

export default upcomingMeetingSlice.reducer;
export { fetchUpcomingMeetings };
